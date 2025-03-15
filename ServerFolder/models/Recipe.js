import mongoose from "mongoose";



const Recipeschema=new mongoose.Schema({
    RecipeId:{
        type: String,
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
        required:true
    },
    ImageUrl:{
        type:String,
        required:true
    },
})

export default mongoose.model("Recipe",Recipeschema)