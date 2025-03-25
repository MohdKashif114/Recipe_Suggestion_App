'use client'
import Image from "next/image";
import { useState, useEffect } from 'react'
import dummydata from "../../public/dummy/dummydata"
import RecipeCard from "../components/RecipeCard"
import Cards from "../components/Cards";
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";

const altpic="/images/fastfoodpic.jpg"

export default function Home() {
  
  interface post {
    RecipeId:number;
    RecipeName: string;
    ImageUrl: string;
    RecipeInstruction: string;
    RecipeDescription:string;
  }
  interface posts {
    recipes:post[];
  }
  const [posts, setPosts] = useState<posts | null> (null);
  const [ingredients,setIng]=useState<string[]> (["cheese","Egg","chocolate"])
  const [loading,setloading]=useState<boolean>(false);

  async function fetchRecipes() {
    try {
        const res = await fetch('http://localhost:6500/generate-recipe', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredients }), // Send array in body
        });
        
        const data: posts = await res.json();
        setPosts(data);
        
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
      setloading(false);
    // setPosts(dummydata);
      
    }

    useEffect(() => {
     fetchRecipes();
  }, [ingredients])
 
  if (!posts) return <div>Loading...</div>
 
  return (
    <div className="flex flex-col  items-center bg-[#EFE3C2]">
      <NavBar/>
      <SearchBar setIng={setIng} setloading={setloading}/>
      {
        loading?(<p>loading...</p>):(<Cards {...posts}/>)
      }
      
    </div>
  )
  
  
 

  
}
