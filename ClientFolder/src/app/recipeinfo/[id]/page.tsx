'use client';

import { authhook } from '@/authcontext/Authcontext';
import NavBar from '@/components/NavBar';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface recipeprops {
  RecipeId: number;
  RecipeName: string;
  ImageUrl: string;
  RecipeInstruction: string;
  RecipeDescription: string;
  Like: number;
}

export default function Page() {
  const params = useParams();
  const auth = authhook();
  const id = params?.id;

  const [dish, setDish] = useState<recipeprops | undefined>(undefined);
  const [instructions, setInstructions] = useState<string | undefined>("");
  const [loadinginstructinos, setloadinginstructions] = useState<boolean | undefined>(false);

  useEffect(() => {
    if (!id || !auth.posts) return;

    const numericId = parseInt(id as string);
    const foundDish = auth.posts.recipes.find((ob) => ob.RecipeId === numericId);
    setDish(foundDish);
  }, [id, auth.posts]);

  const instructionshandler = async () => {
    if (!dish) return;
    try {
      const ingredientsString = auth.ingredients.join(',');
      console.log(dish.RecipeName);
      setloadinginstructions(true);
      const res = await fetch(`https://recipe-suggestion-app-vtq8.onrender.com/instructions?name=${dish.RecipeName}&id=${dish.RecipeId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      const instructions = data.instructions;
      if (instructions) {
        setInstructions(instructions);
        setloadinginstructions(false);
      }
    } catch (err) {
      console.error("error fetching instructions in frontend", err);
    }
  };

  useEffect(() => {
    if (dish) {
      instructionshandler();
    }
  }, [dish]);

  if (!dish) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#f1e3ba] text-[#123524]">
        <NavBar />
        <p className="text-lg">Loading recipe...</p>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#f1e3ba] flex items-center justify-center p-8 text-[#123524]">
        <div className="bg-[#f1e3ba] shadow-lg border-2 border-[#3E7B27] rounded-lg overflow-hidden flex flex-col md:flex-row max-w-5xl w-full">

          {/* Left side: image and description */}
          <div className="md:w-1/2 w-full flex flex-col items-center p-6">
            <div className="w-full h-48 md:h-60 mb-4">
              <img
                src={dish.ImageUrl}
                alt={dish.RecipeName}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <p className="text-lg font-semibold mb-2">Likes: {dish.Like}</p>
            <h2 className="text-2xl font-bold text-center mb-2">{dish.RecipeName}</h2>
            <p className="text-sm text-center">{dish.RecipeDescription}</p>
          </div>

          {/* Right side: only instructions */}
          <div className="md:w-1/2 w-full p-8 flex flex-col">
            <h3 className="text-xl font-semibold mb-4">Instructions</h3>
            {loadinginstructinos
              ? <p>Loading...</p>
              : <p className="whitespace-pre-line">{instructions}</p>
            }
          </div>

        </div>
      </div>
    </>
  );
}
