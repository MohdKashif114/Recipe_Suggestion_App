import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config();




export const signupcontroller=async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const email=req.body.email;
    console.log(username);
    console.log(email);
    try{
        const finduser = await User.findOne({ $or: [{ UserName: username }, { Email: email }] });
        if (finduser) {
        return res.status(400).json({
            success: false,
            message: "User with this username or email already exists"
        });
        }

        const saltRounds=10;
        let hashedpw;
        try{
            hashedpw=await bcrypt.hash(password, saltRounds);
        }catch(err){
            res.status(400).json({
                success:false,
                message:"Can't hash password"
            })
        }
       
        const user=new User({UserName:username,Password:hashedpw,Email:email})
        const saveduser=await user.save();
        console.log("creating jwt");
        const token=jwt.sign({id:username},process.env.JWT_SECRET,{expiresIn:"1h"});
        console.log("creatie cookie")
        res.cookie("token",token,{maxAge:1*60*60*1000,httpOnly:true,secure: false,sameSite: "lax"});
        console.log("Set-Cookie:", res.getHeaders()["set-cookie"]); 
        res.status(200).json({success:true,message:"Cookie created succesfully"})

    }catch(err){
        console.log(err)
        res.status(400).json({success:false,message:"Some error occured while creating cookie"})
    }    
}



export const authenticate=async(req,res)=>{
    if(req.user){
        return res.json({userid:req.user.id})
    }
    else{
        return res.json({error:"cant find user"})
    }

}



