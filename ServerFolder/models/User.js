import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    UserName:{
        required:true,
        type:String,
        unique:true
    },
    Password:{
        required:true,
        type:String
    },
    Email:{
        required:true,
        type:String
    }
})

export default mongoose.model("User",userSchema)