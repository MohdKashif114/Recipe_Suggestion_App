import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import {generateRecipeId} from "./Utils/generateId.js"
import Recipe from "./models/Recipe.js";
import DBconnect from "./config/database.js";
import recipecontroller from "./controllers/Recipecontroller.js";
import signupcontroller from "./controllers/signupcontroller.js"
import userRoutes from "./Routes/userRoutes.js"
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


DBconnect();

app.use("/auth",userRoutes)


app.post("/generate-recipe",recipecontroller);



const PORT = 6500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
