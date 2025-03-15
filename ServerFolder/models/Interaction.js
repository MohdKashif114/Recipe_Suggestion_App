import mongoose from "mongoose";
import Recipe from "./Recipe";
import User from "./User";


const Interactions=new mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    RecipeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Recipe",
        required:true
    },
    Comment:{
        type:String,
    },
    Rating:{
        type:Number,
        min:1,
        max:5
    },
    Like:{
        type:Boolean,
        default:false
    }

});

export default mongoose.model("Interactions",Interactions)
