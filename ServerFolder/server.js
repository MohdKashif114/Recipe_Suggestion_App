import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import {generateRecipeId} from "./Utils/generateId.js"
import Recipe from "./models/Recipe.js";
import DBconnect from "./config/database.js";
import recipecontroller from "./controllers/Recipecontroller.js";
import {signupcontroller} from "./controllers/signupcontroller.js"
import userRoutes from "./Routes/userRoutes.js"
import cookieParser from "cookie-parser";
import {likecontroller,fetchlikecontroller} from "./controllers/likecontroller.js";
import auth from "./middlewares/auth.js"
import { loggoutcontroller } from "./controllers/logincontroller.js";
import { fetchcommentcontroller } from "./controllers/commentcontroller.js";
import { fetchinstructions } from "./controllers/instructionscontroller.js";
dotenv.config();

const app = express();
app.use(cors({
    origin: true,  
    credentials: true , 
}));
app.use(cookieParser());
app.use(express.json());

// app.use((req, res, next) => {
//     res.header({"Access-Control-Allow-Origin": "*"});
//     next();
//   }) 

// app.use(cors());


DBconnect();

app.use("/auth",userRoutes)


app.post("/generate-recipe",recipecontroller);
app.post("/liked",auth,likecontroller);
app.post("/likes",fetchlikecontroller);
app.get("/loggout",loggoutcontroller);
app.get("/comments",fetchcommentcontroller);
app.get("/instructions",fetchinstructions);





const PORT = 6500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
