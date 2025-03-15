import dummydata from "../../../public/dummy/dummydata"
import Image from "next/image"


interface recipeprops{
    recipeName: string;
    imageUrl: string;
    instructions: string;
    description:string;
}

export default function RecipeCard({recipeName,imageUrl,description,instructions}:recipeprops){


    

    return (
        <div className="flex flex-col justify-center items-center gap-4 p-2 ">
            <div>
                <h1 className="text-lg" >{recipeName}</h1>
            </div>
            <div className="flex justify-center">
            <Image className=""
                src={imageUrl}
                alt="Picture of the author"
                width={300}
                height={200}
            />
            </div>
            
            <div>
                <p>{(description.length)>60?(description.substring(0,60)):(description)}</p>
            </div>
        </div>
    )
    
}

