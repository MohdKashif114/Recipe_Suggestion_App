import express from "express"
import { Router } from "express"
import {signupcontroller, authenticate } from "../controllers/signupcontroller.js"
import {logincontroller} from "../controllers/logincontroller.js"
import auth from "../middlewares/auth.js"
import profilecontroller from "../controllers/profilecontroller.js"
import { fetchlikedornotcontroller } from "../controllers/likecontroller.js"
import { postcommentcontroller } from "../controllers/commentcontroller.js"


const router=express.Router();

router.post("/signup",signupcontroller)
router.post("/login",logincontroller);
router.get("/profile",auth,profilecontroller);

router.get("/authenticate",auth,authenticate)
router.get("/likedornot",auth,fetchlikedornotcontroller)
router.post("/commented",auth,postcommentcontroller);

export default router;