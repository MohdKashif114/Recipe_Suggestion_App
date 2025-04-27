'use client'
import Image from "next/image";
import { useState, useEffect } from 'react'
import dummydata from "../../../public/dummy/dummydata";
import RecipeCard from "@/components/RecipeCard";
import Cards from "@/components/Cards";
import SearchBar from "@/components/SearchBar";
import NavBar from "@/components/NavBar";
import { authhook } from "@/authcontext/Authcontext";
import { motion } from "framer-motion";

const altpic="/images/fastfoodpic.jpg"

export default function Home() {
  
  const auth=authhook();

 
  


 
  if (!auth.posts) return <div>Loading...</div>
  const items = ["1", "2", "3", "4", "5","6","7","8"];
  let i=0;

  return (
    <div className="flex flex-col  items-center bg-[#EFE3C2] overflow-hidden">
      <NavBar/>
      <SearchBar/>
      


      {
        auth.loading?(<p>loading...</p>):(<Cards {...auth.posts}/>)
      }
      
    </div>
  )
  
  
 

  
}
