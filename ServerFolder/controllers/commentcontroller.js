import User from "../models/User.js";
import Recipe from "../models/Recipe.js";
import Interaction from "../models/Interaction.js";



export const postcommentcontroller=async(req,res)=>{
    const username=req.user.id;
    const recipeid=req.body.recipeId;
    const comment=req.body.comment;
    console.log("username & recipe id are",username,recipeid);
    console.log(comment);
    try{
        const recipe=await Recipe.findOne({RecipeId:recipeid});
        const user=await User.findOne({UserName:username});
        if(!recipe || !user){
             return res.status(400).json({success:false,message:"The user or recipe does not exist"})
        }
        const savedcomment=await Interaction.findOneAndUpdate({RecipeId:recipeid,UserName:username},{Comment:comment},{new:true,upsert:true})
        console.log("saved comment is ",savedcomment);
        res.status(200).json({success:true,message:"comment added"});

    }catch(err){
        console.log("some error occured while commenting",err)
        res.status(400).json({success:false,message:"Cant add comment"})
    }
    
}


export const fetchcommentcontroller=async(req,res)=>{
    const recipeid=req.body.recipeId;
    try{
        const comments=await Interaction.find({RecipeId:recipeid,Comment:{$ne:""}},{RecipeId:0,_id:0,Like:0,__v:0});
        console.log(comments);
        res.status(200).json({success:true,message:"comments fetched",commentsarr:comments})
        
    }catch(err){
        console.log("eeror occurred while fething comments",err);
    }
    
    
}