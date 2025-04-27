import express from "express";
import cors from "cors";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import dotenv from "dotenv";
import {generateRecipeId} from "../Utils/generateId.js"
import Recipe from "../models/Recipe.js";
import happyfacetext from "../test.js";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const schema = {
  
    type: SchemaType.OBJECT,
    properties: {
    //   instructions: { type: "string", nullable: false },
      description: {type:"string",nullable:false}
    },
    required: ["description"],
  };



 const recipecontroller=async (req,res)=>{

        //if ingredients is empty
        const { ingredients } = req.body;
        if (!ingredients || !Array.isArray(ingredients)) {
          return res.status(400).json({ error: "Invalid ingredients list" });
        }
      
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-pro",
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
          },
        });
      
        try {
         
        //   console.log("running post req....")
        //   console.log({recipes})

        const recipe_data=await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(",+")}&ranking=1&apiKey=${process.env.SpoonApi_Key}`)
        const recipes=await recipe_data.json();
        console.log(recipes);
        const finalformatfunc=(recipes)=>{
            return recipes.map((recipe)=>({
                    recipeId:recipe.id,
                    recipeName:recipe.title,
                    imageUrl:recipe.image,
                    itemsMissed:recipe.missedIngredientCount,
                    itemsUsed:recipe.usedIngredientCount,
                    instructions:"",
                    description:""

            }))
        }

        const finalformat=finalformatfunc(recipes);
      
          //fetching from spoonacular
          const updatedRecipes=await Promise.all(
            finalformat.map(async (recipePar)=>{

            const name=recipePar.recipeName;
            const recipeid=recipePar.recipeId;
              try{
                const dbrecipe=await Recipe.findOne({RecipeId:recipeid});
                if(dbrecipe){
                  console.log("fetching recipe form the db")
                  return dbrecipe;
                }
                
                let recipeDesNIns={description:""};
                  const prompt = `Give a mouth watering description of ${name} of atleast 50 words`;
                  recipeDesNIns.description=await happyfacetext(name);
                
                
                    
                    
                    console.log(recipeDesNIns);
                    console.log("saving recipe....")
                    try{
                      const recipeInst=new Recipe({
                        RecipeId:recipePar.recipeId,
                        RecipeName:recipePar.recipeName,
                        ImageUrl:recipePar.imageUrl,
                        RecipeInstruction:recipePar.instructions,
                        RecipeDescription:recipeDesNIns.description
                      })
                      const savedrecipe= await recipeInst.save();
                    }catch(err){
                      console.error("Error saving recipe:", err);
                      return {
                        ...recipePar,
                        saveError: "Failed to save recipe",
                      };
                    }

                  return{
                    ...recipePar,
                    description:recipeDesNIns.description,
                    Like:0
                  }
              }
              catch(err){
                console.error(`Error fetching description for ${recipePar.recipeName}:`, err);
                return{
                    ...recipePar,
                    description: await happyfacetext(name),
                    Like:0
                  }
              }
              return recipePar;
            })
          )
          console.log("The updated recipe is....");
          console.log(updatedRecipes)
          res.status(200).json({ recipes:updatedRecipes });
        } catch (error) {
          res.status(500).json({ error: "Failed to generate recipes" });
        }
      }

export default recipecontroller;