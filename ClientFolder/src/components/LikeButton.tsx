"use client"
import React from 'react'
import { useState,useEffect,useContext } from 'react';
import {authhook} from "../authcontext/Authcontext"
import {useRouter} from 'next/navigation';
import Router from "next/navigation"



interface post {
    RecipeId:number;
    RecipeName: string;
    ImageUrl: string;
    RecipeInstruction: string;
    RecipeDescription:string;
    Like:number;
  }
  interface posts {
    recipes:post[];
  }

function LikeButton({RecipeId}:{RecipeId:number}) {

    const router=useRouter();
    const [like,setLike]=useState<Number>(0);
    const auth=authhook();
    const [liked,setLiked]=useState<boolean>(false);


const fetchlike=async ()=>{
    try{
        const res=await fetch('http://localhost:6500/likes',{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({recipeId:RecipeId})
        })
        const count=await res.json();
        setLike(count.likes);
        auth.setPosts((prev:posts) => {
            if (!prev) return prev; 
            return {
              ...prev,
              recipes: prev.recipes.map((recipe) => {

                  console.log(count.likes)
                  return recipe.RecipeId === RecipeId 
                    ? { ...recipe, Like: count.likes } 
                    : recipe
              }
              ),
            };
          });
          

        
    }catch(err){
        console.log("Error fetching recipes")
    }

}

const fetchlikedornot=async ()=>{
    try{
        const res=await fetch(`http://localhost:6500/auth/likedornot?recipeId=${RecipeId}`,{method:"GET",headers:{"Conten-Type":"application/json"},credentials:"include"});
        const data=await res.json();
        if(data.founded){
            setLiked(true);
        }
    }catch(err){
        setLiked(false);
        console.log("cant get whether liked or not",err);
    }
}

    useEffect(()=>{
        fetchlike();
        fetchlikedornot();
    },[]);
    
    const likehandler=async()=>{
        if(!auth.user){
            router.push("/login")
        }
        try{
            const res=await fetch('http://localhost:6500/liked',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({recipeId:RecipeId}),
                credentials:"include"
            })
            console.log(liked)
            setLiked(true);
            fetchlike();
        }catch(err){
            console.log("some error occured while liking",err)
        }
    }
  

  return (
    <div>
        <span>{auth.user}</span>
        <button className={`${liked && auth.user?"text-red-300":"text-black"}`} onClick={likehandler}>{`Like : ${like} of recipe ${RecipeId}`}</button>
    </div>
  )
}

export default LikeButton;