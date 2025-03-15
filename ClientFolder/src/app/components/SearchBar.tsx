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
        setIng(ingredients);
        console.log(ingredients)
        setloading(true)
    }

    return(
        <div className="">
                <div>

                
                <input
                    className="border-2"
                    type="text"
                    id="ingredient"
                    placeholder="Whats in your fridge"
                    value={inputval}
                    onChange={(e)=>setInputval(e.target.value)}
                    onKeyDown={handlekeydown}    
                >
                </input>
                <button
                  onClick={(event)=>putinbasket(event,inputval)}  >Add to basket</button>

                </div>
                <div>
                    {
                        ingredients.map((ingredient)=>(
                            <label>
                                <input type="checkbox" 
                                    checked={ingredients.includes(ingredient)} 
                                    onChange={()=>handlecheckbox(ingredient)}></input>
                                {ingredient}
                            </label>
                        ))
                    }
                </div>
                <div>
                    <button onClick={handleRecipe}>Show Recipes</button>
                </div>
            
        </div>
    )
}