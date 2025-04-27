import { authhook } from "@/authcontext/Authcontext";
import { useState } from "react"



export default function SearchBar(){
    
    const auth=authhook();



    const putinbasket=(event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>,ingredient:string):void=>{
        event.preventDefault();
        if(!auth.cbingredients.includes(ingredient)){
            auth.setcbIngredients([...auth.cbingredients,ingredient]);
        }
        auth.setInputval("");
        console.log(auth.cbingredients);
    }

    const handlekeydown=(event:React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key==="Enter"){
            putinbasket(event,auth.inputval);
        }
    }

    const handlecheckbox=(ingredient:string)=>{
        const filteredIng=auth.cbingredients.filter((el)=>el!=ingredient);
        auth.setcbIngredients(filteredIng);
        // console.log(ingredients);
    }

    const handleRecipe=()=>{
        auth.setIng([...auth.cbingredients]);
        console.log("set ingredients in handlerecipe",auth.cbingredients)
        auth.setloading(true)
    }

    return(
        <div className=" py-6 w-xl gap-2 flex justify-around flex-col">
                <div className="flex justify-around flex-row items-center border-2 rounded-md">

                
                <input
                    className="border-0 w-11/12 h-10 rounded-md rounded-r-none p-2"
                    type="text"
                    id="ingredient"
                    placeholder="Whats in your fridge"
                    value={auth.inputval}
                    onChange={(e)=>auth.setInputval(e.target.value)}
                    onKeyDown={handlekeydown}    
                >
                </input>
                <button className="bg-[#3E7B27] h-10 rounded-l-none rounded-sm text-sm leading-none"
                  onClick={(event)=>putinbasket(event,auth.inputval)}  >Add to basket</button>

                </div>
                <div className="flex gap-2 flex-row " >
                    {
                        auth.cbingredients.map((ingredient,key)=>(
                            <label key={key} className="p-1  border-2 rounded-md ">
                                <input type="checkbox" className="w-4 m-1 "
                                    checked={auth.cbingredients.includes(ingredient)} 
                                    onChange={()=>handlecheckbox(ingredient)}></input>
                                {ingredient}
                            </label>
                        ))
                    }
                </div>
                <div className="flex justify-center ">
                    <button onClick={handleRecipe} className="bg-[#3E7B27] rounded-md w-32 h-10 border-2" >Show Recipes</button>
                </div>
            
        </div>
    )
}