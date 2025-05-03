import { useState } from "react";
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
  RecipeInstruction,
}: recipeprops) {
  const router = useRouter();
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  const navigationhandler = () => {
    router.push(`/recipeinfo/${RecipeId}`);
  };

  const handleReadMore = () => {
    setDescriptionExpanded(true);
  };

  return (
    <div className="flex flex-col justify-around items-center gap-4 p-4 rounded-md bg-[#f1e3ba] text-[#123524] border-2">
      <div>
        <h1
          onClick={navigationhandler}
          className="text-lg h-12 text-center font-extrabold cursor-pointer"
        >
          {RecipeName}
        </h1>
      </div>
      <div>
        <Image
          className="rounded-md cursor-pointer"
          onClick={navigationhandler}
          src={
            ImageUrl ||
            "https://img.spoonacular.com/recipes/665188-312x231.jpg"
          }
          alt="Picture of the author"
          width={300}
          height={200}
        />
      </div>

      <div>
        <p>
          {isDescriptionExpanded
            ? RecipeDescription
            : RecipeDescription?.length > 120
            ? `${RecipeDescription.substring(0, 120)}...`
            : RecipeDescription}
        </p>
      </div>

      {/* Read more link */}
      {RecipeDescription?.length > 120 && !isDescriptionExpanded && (
        <button
          onClick={navigationhandler}
          className="text-blue-500 font-semibold mt-2 cursor-pointer"
        >
          Know More
        </button>
      )}

      <div>
        <LikeButton RecipeId={RecipeId} />
      </div>
    </div>
  );
}
