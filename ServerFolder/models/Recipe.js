import mongoose from "mongoose";



const Recipeschema=new mongoose.Schema({
    RecipeId:{
        type: Number,
        required:true,
        unique:true
    },
    RecipeName:{
        type:String,
        required:true,
    },
    RecipeDescription:{
        type:String,
        required:true,
    },
    RecipeInstruction:{
        type:String,
    },
    ImageUrl:{
        type:String,
        required:true
    },
})

export default mongoose.model("Recipe",Recipeschema)