import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });



export default async function happyfacetext(recipeName) {
   try{
    const chatCompletion = await getGroqChatCompletion(recipeName);
    // Print the completion returned by the LLM.
    const description=(chatCompletion.choices[0]?.message?.content || "")
    console.log(description);
    return description;
   }catch(err){
        console.error(`Error generating form Groq`,err);
   }
  

}

export async function getGroqChatCompletion(recipeName) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Give me a mouth-watering description of ${recipeName} of atleast 50 words `,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}


