"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { authhook } from "../authcontext/Authcontext"
import { HeartIcon, HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'

interface post {
  RecipeId: number;
  RecipeName: string;
  ImageUrl: string;
  RecipeInstruction: string;
  RecipeDescription: string;
  Like: number;
}

interface posts {
  recipes: post[];
}

function LikeButton({ RecipeId }: { RecipeId: number }) {
  const router = useRouter();
  const [like, setLike] = useState<Number>(0);
  const auth = authhook();
  const [liked, setLiked] = useState<boolean>(false);

  const fetchlike = async () => {
    try {
      const res = await fetch('http://localhost:6500/likes', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId: RecipeId })
      })
      const count = await res.json();
      setLike(count.likes);
      auth.setPosts((prev: posts) => {
        if (!prev) return prev;
        return {
          ...prev,
          recipes: prev.recipes.map((recipe) => {
            return recipe.RecipeId === RecipeId
              ? { ...recipe, Like: count.likes }
              : recipe
          }),
        };
      });
    } catch (err) {
      console.log("Error fetching recipes");
    }
  }

  const fetchlikedornot = async () => {
    try {
      const res = await fetch(`http://localhost:6500/auth/likedornot?recipeId=${RecipeId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      const data = await res.json();
      if (data.founded) {
        setLiked(true);
      }
    } catch (err) {
      setLiked(false);
      console.log("can't get whether liked or not", err);
    }
  }

  useEffect(() => {
    fetchlike();
    fetchlikedornot();
  }, []);

  const likehandler = async () => {
    if (!auth.user) {
      router.push("/login");
    }
    try {
      const res = await fetch('http://localhost:6500/liked', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId: RecipeId }),
        credentials: "include"
      })
      setLiked(true);
      fetchlike();
    } catch (err) {
      console.log("Some error occurred while liking", err);
    }
  }

  return (
    <div>
      <button
        className={`flex items-center gap-2 ${liked && auth.user ? "text-red-500" : "text-black"}`}
        onClick={likehandler}
      >
        {liked && auth.user ? (
          <HeartIcon className="h-5 w-5 text-red-500" />
        ) : (
          <HeartOutlineIcon className="h-5 w-5 text-black" />
        )}
        <span>{`${like}`}</span>
      </button>
    </div>
  )
}

export default LikeButton;
