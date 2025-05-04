import Image from "next/image";
import LikeButton from "./LikeButton";
import { useRouter } from "next/navigation";

interface recipeprops {
  RecipeId: number;
  RecipeName: string;
  ImageUrl: string;
  RecipeInstruction: string;
  RecipeDescription: string;
}
export default function RecipeCard({
    RecipeId,
    RecipeName,
    ImageUrl,
    RecipeDescription,
  }: recipeprops) {
    const router = useRouter();
  
    const navigationhandler = () => {
      router.push(`/recipeinfo/${RecipeId}`);
    };
  
    return (
      <div className="flex flex-col justify-between items-center gap-4 p-4 rounded-md bg-[#f1e3ba] text-[#123524] border-2 w-full max-w-sm mx-auto">
        <div className="w-full">
          <h1
            onClick={navigationhandler}
            className="text-lg text-center font-extrabold cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap"
            title={RecipeName} 
          >
            {RecipeName}
          </h1>
        </div>
        <div>
          <Image
            className="rounded-md cursor-pointer"
            onClick={navigationhandler}
            src={ImageUrl || "https://img.spoonacular.com/recipes/665188-312x231.jpg"}
            alt="Recipe Image"
            width={300}
            height={200}
            layout="responsive"
          />
        </div>
  
        <div>
          <p className="text-sm sm:text-base">
            {RecipeDescription?.length > 120
              ? `${RecipeDescription.substring(0, 120)}...`
              : RecipeDescription}
          </p>
        </div>
  
        <button
          onClick={navigationhandler}
          className="text-[#07904e] font-semibold mt-2 cursor-pointer"
        >
          Know More
        </button>
  
        <div>
          <LikeButton RecipeId={RecipeId} />
        </div>
      </div>
    );
  }
  