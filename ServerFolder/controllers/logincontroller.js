import mongoose from "mongoose";
import User from "../models/User.js";
// import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();


export const logincontroller=async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    try{
        const saveduser=await User.findOne({
            $or:[{Email:username},{UserName:username}]
        });
        console.log(saveduser);
        if(!saveduser){
            res.status(400).json({success:false,message:"No user found"})
        }

        const hashedpw=saveduser.Password;
        const isValid=await bcrypt.compare(password,hashedpw);
        if(!isValid){
            res.status(400).json({success:false,message:"Incorrect password"})
        }
        const token=jwt.sign({id:saveduser.UserName},process.env.JWT_SECRET,{expiresIn:"10hr"})
        console.log(token);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,         
            sameSite: "None",     
            maxAge: 10 * 60 * 60 * 1000,
          });
          
        res.status(200).json({success:true,message:"Logged in successfully"})
        console.log("password right")
    }catch(err){
        res.status(400).json({success:false,message:"Some error occurred while logging in"})
    }
}



export const loggoutcontroller=(req,res)=>{
    try{
        res.clearCookie("token",{httpOnly:true,secure: false,sameSite: "lax"})
        res.status(200).json({message:"User logged out"})
    }catch(err){
        console.log("error while deleting",err);
    }
    
}
