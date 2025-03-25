import mongoose from "mongoose";
import Interaction from "../models/Interaction.js";
import configDotenv  from "dotenv";
import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

configDotenv.config();


export const likecontroller=async (req,res)=>{
    const username=req.user.id;
    const recipeid=req.body.recipeId;
    console.log("inside like controller")
    try{
        const recipe=await Recipe.findOne({RecipeId:recipeid});
        const user=await User.findOne({UserName:username});
        if(!recipe || !user){
            return res.status(400).json({success:false,message:"The user or recipe does not exist"})
        }
        const liked=await Interaction.findOneAndUpdate({UserName:username,RecipeId:recipeid},{Like:true},{new:true,upsert:true});
        console.log(liked);
        res.status(200).json({success:true,message:"Like added"})
    }catch(err){
        console.log("some error occurred while liking",err);
        res.status(400).json({success:false,message:"some error occurred"});
    }
}


export const fetchlikecontroller=async (req,res)=>{
    const recipeid=req.body.recipeId;
    console.log(recipeid);
    try{
        const count=await Interaction.countDocuments({RecipeId:recipeid,Like:true});
        res.status(200).json({likes:count});
    }catch(err){
        console.log("cant fetch likes",err);
        res.status(400).json({success:false,message:"Can't fetch like"});
    }
}

export const fetchlikedornotcontroller=async(req,res)=>{
    const recipeid=req.query.recipeId;
    if(!recipeid){
        res.status(400).json({message:"RecipeId is required"})
        console.log("recipeid required")
    }
    let username;
    username=req.user.id;
    try{
        const found=await Interaction.findOne({RecipeId:recipeid,UserName:username,Like:true})
        res.json({founded:found});
    }catch(err){
        res.json({founded:false})
        console.log("cant fetch liked or not from the database",err)
    }
}

