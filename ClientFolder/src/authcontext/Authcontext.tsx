"use client"
import {useState,createContext,useEffect,Dispatch,SetStateAction,ReactNode, useContext} from "react"



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
interface AuthContextType {
  user: string | null; 
  setUser: Dispatch<SetStateAction<string | null>>;
  posts: posts | null;
  setPosts: Dispatch<SetStateAction<posts | null>>;
  ingredients: string[];
  setIng: Dispatch<SetStateAction<string[]>>;
  loading: boolean;
  setloading: Dispatch<SetStateAction<boolean>>;
  inputval: string;
  setInputval: Dispatch<SetStateAction<string>>;
  cbingredients: string[];
  setcbIngredients: Dispatch<SetStateAction<string[]>>;
}


export const AuthProvider=createContext<AuthContextType | null>(null);



export default function Authcontext({children}:{children:ReactNode}){
    const[cbingredients,setcbIngredients]=useState<string[]>([]);
    const[inputval,setInputval]=useState<string>("");
    
    const [loading,setloading]=useState<boolean>(false);
  const [posts, setPosts] = useState<posts | null> (null);
  const [ingredients,setIng]=useState<string[]> (["cheese","Egg","chocolate"])
  const [user,setUser]=useState<string | null>(null);
  async function fetchRecipes() {
    try {
        const res = await fetch('https://recipe-suggestion-app-vtq8.onrender.com/generate-recipe', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredients }), 
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
 
    
    const fetchauthentication=async ()=>{
        try{
            const res=await fetch("https://recipe-suggestion-app-vtq8.onrender.com/auth/authenticate",{method:"GET",credentials:"include"})
            const result=await res.json()
            if(result){
                setUser(result.userid)
            }
        }catch(err){
            setUser(null);
            console.log(err);
        }

    }



    useEffect(()=>{
        fetchauthentication();
    },[])


    return(
            <AuthProvider.Provider value={{user,setUser,posts,setPosts,ingredients,setIng,loading,setloading,inputval,setInputval,
                setcbIngredients,cbingredients
            }}>
            {children}
            </AuthProvider.Provider>
    )
}



export const useAuth=()=>{
    const context=useContext(AuthProvider)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
      }
      return context;
}