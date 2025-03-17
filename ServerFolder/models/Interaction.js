import mongoose from "mongoose";
import Recipe from "./Recipe.js";
import User from "./User.js";


const Interaction=new mongoose.Schema({
    UserName:{
        type:String,
        ref:"User",
        required:true
    },
    RecipeId:{
        type:Number,
        ref:"Recipe",
        required:true
    },
    Comment:{
        type:String,
        default:""
    },
    Rating:{
        type:Number,
        min:1,
        max:5,
        dafault:0
    },
    Like:{
        type:Boolean,
        default:false
    },
},{timestamps:true}
);

export default mongoose.model("Interaction",Interaction)
