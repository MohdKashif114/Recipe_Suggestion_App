import { useState } from "react"



export default function SearchBar({setIng,setloading}:{setIng:React.Dispatch<React.SetStateAction<string[]>>;
                                                        setloading:React.Dispatch<React.SetStateAction<boolean>>}){

    const[ingredients,setIngredients]=useState<string[]>([]);
    const[inputval,setInputval]=useState<string>("");



    const putinbasket=(event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>,ingredient:string):void=>{
        event.preventDefault();
        if(!ingredients.includes(ingredient)){
            setIngredients([...ingredients,ingredient]);
        }
        setInputval("");
        console.log(ingredients);
    }

    const handlekeydown=(event:React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key==="Enter"){
            putinbasket(event,inputval);
        }
    }

    const handlecheckbox=(ingredient:string)=>{
        const filteredIng=ingredients.filter((el)=>el!=ingredient);
        setIngredients(filteredIng);
        // console.log(ingredients);
    }

    const handleRecipe=()=>{
        setIng([...ingredients]);
        console.log("set ingredients in handlerecipe",ingredients)
        setloading(true)
    }

    return(
        <div className=" py-6 w-xl gap-2 flex justify-around flex-col">
                <div className="flex justify-around flex-row items-center border-2 rounded-md">

                
                <input
                    className="border-0 w-11/12 h-10 rounded-md rounded-r-none p-2"
                    type="text"
                    id="ingredient"
                    placeholder="Whats in your fridge"
                    value={inputval}
                    onChange={(e)=>setInputval(e.target.value)}
                    onKeyDown={handlekeydown}    
                >
                </input>
                <button className="bg-[#3E7B27] h-10 rounded-l-none rounded-sm text-sm leading-none"
                  onClick={(event)=>putinbasket(event,inputval)}  >Add to basket</button>

                </div>
                <div className="flex gap-2 flex-row " >
                    {
                        ingredients.map((ingredient,key)=>(
                            <label key={key} className="p-1  border-2 rounded-md ">
                                <input type="checkbox" className="w-4 m-1 "
                                    checked={ingredients.includes(ingredient)} 
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