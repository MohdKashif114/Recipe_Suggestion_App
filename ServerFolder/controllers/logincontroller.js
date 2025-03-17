import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();


const logincontroller=async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    try{
        const saveduser=await User.findOne({Username:username})
        console.log(saveduser);
        if(!saveduser){
            res.status(400).json({success:false,message:"No user found"})
        }

        const hashedpw=saveduser.Password;
        const isValid=await bcrypt.compare(password,hashedpw);
        if(!isValid){
            res.status(400).json({success:false,message:"Incorrect password"})
        }
        const token=jwt.sign({id:username},process.env.JWT_SECRET,{expiresIn:"10sec"})
        console.log(token);
        res.cookie("token",token,{httpOnly:true,maxAge:10*1000})
        res.status(200).json({success:true,message:"Logged in successfully"})
        console.log("password right")
    }catch(err){
        res.status(400).json({success:false,message:"Some error occurred while logging in"})
    }
}


export default logincontroller;