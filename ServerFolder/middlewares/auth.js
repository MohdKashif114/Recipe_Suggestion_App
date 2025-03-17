import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();
// res.set('Access-Control-Allow-Origin', 'http://localhost:6500');

const auth=async (req,res,next)=>{
    try{
        console.log("Verifying token...");
        console.log("Cookies:", req.cookies);
        console.log("token:",req.cookies.token);
        console.log("Headers:", req.headers.authorization);
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if(!token){
            console.log("no token present")
            return res.status(400).json({success:false,message:"token not found"})
        }
        try{
            console.log("decoding..")
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;
            next(); 
        }catch(err){
            console.log("Cant verify token...")
           return res.status(400).json({success:false,message:"Cant verify token"})
        }
    }catch(err){
        console.log("some error happened",err);
        res.status(400).json({success:false,message:"Some error occurred"});
    }
}


export default auth;