import Groq from "groq-sdk";
import dotenv from "dotenv";
import Recipe from "../models/Recipe.js";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });



 async function happyfacetext(recipeName) {
   try{
    const chatCompletion = await getGroqChatCompletion(recipeName);
    // Print the completion returned by the LLM.
    const instructions=(chatCompletion.choices[0]?.message?.content || "")
    console.log(instructions);
    return instructions;
   }catch(err){
        console.error(`Error generating form Groq`,err);
   }
  

}

function getGroqChatCompletion(recipeName) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        // content: `Give me a mouth-watering description of ${recipeName} of atleast 50 words `,
        content: `Give me a brief step by step instructions of how to make ${recipeName} `,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}

export const fetchinstructions = async (req, res) => {
    const recipeName = req.query.name;
    const id = req.query.id;
  
    try {
      let dprecipe = await Recipe.findOne({ RecipeId: id });
  
      // If recipe exists and instructions already saved
      if (dprecipe && dprecipe.RecipeInstruction) {
        console.log("Fetched instructions from DB:", dprecipe.RecipeInstruction);
        return res.json({ instructions: dprecipe.RecipeInstruction });
      }
  
      // If not found or no instructions yet, generate them
      const instructions = await happyfacetext(recipeName);
      console.log("The instructions are:", instructions);
  
      if (instructions) {
        // Save the new instructions
        if (dprecipe) {
          // If recipe exists, update it
          dprecipe.RecipeInstruction = instructions;
          await dprecipe.save();
        }
  
        res.json({ instructions: instructions });
      } else {
        res.json({ instructions: "Can't fetch instructions" });
      }
    } catch (err) {
      console.error("Error while fetching instructions:", err);
      res.status(500).json({ success: false, message: "Can't fetch instructions" });
    }
  };
  