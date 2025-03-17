import { useState } from "react";
import dummydata from "../../../public/dummy/dummydata"
import Image from "next/image"
import LikeButton from "./LikeButton";


interface recipeprops {
    RecipeId:number;
    RecipeName: string;
    ImageUrl: string;
    RecipeInstruction: string;
    RecipeDescription:string;
  }

export default function RecipeCard({RecipeId,RecipeName,ImageUrl,RecipeDescription,RecipeInstruction}:recipeprops){


    

    return (
        <div className="flex flex-col justify-center items-center gap-4 p-2 ">
            <div>
                <h1 className="text-lg" >{RecipeName}</h1>
            </div>
            <div className="flex justify-center">
            <Image className=""
                src={ImageUrl}
                alt="Picture of the author"
                width={300}
                height={200}
            />
            </div>
            
            <div>
                <p>{(RecipeDescription.length)>60?(RecipeDescription.substring(0,60)):(RecipeDescription)}</p>
            </div>
            <div>
                <LikeButton RecipeId={RecipeId}/>
            </div>
        </div>
    )
    
}

