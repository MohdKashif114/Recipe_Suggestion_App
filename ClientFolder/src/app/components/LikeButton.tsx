"use client"
import React from 'react'
import { useState,useEffect } from 'react';

function LikeButton({RecipeId}:any) {
    
    const [like,setLike]=useState<Number>(0);


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
    }catch(err){
        console.log("Error fetching recipes")
    }

}
    useEffect(()=>{
        fetchlike();
    },[]);
    
    const likehandler=async()=>{
        try{
            const res=await fetch('http://localhost:6500/liked',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({recipeId:RecipeId}),
                credentials:"include"
            })
            fetchlike();
        }catch(err){
            console.log("some error occured while liking",err)
        }
    }


  return (
    <div>
        <button onClick={likehandler}>{`Like : ${like} of recipe ${RecipeId}`}</button>
    </div>
  )
}

export default LikeButton;