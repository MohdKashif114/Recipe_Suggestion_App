"use client"
import {useState,createContext,useEffect,Dispatch,SetStateAction,ReactNode, useContext} from "react"
import { boolean, set } from "zod";


interface AuthContextype{
    user: null;
    setUser:Dispatch<SetStateAction<any>>;
}


export const AuthProvider=createContext<AuthContextype | null>(null);



export default function Authcontext({children}:{children:ReactNode}){
    
    const [user,setUser]=useState<null>(null);
    const fetchauthentication=async ()=>{
        try{
            const res=await fetch("http://localhost:6500/auth/authenticate",{method:"GET",credentials:"include"})
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
            <AuthProvider.Provider value={{user,setUser}}>
            {children}
            </AuthProvider.Provider>
    )
}



export const authhook=()=>{
    const context=useContext(AuthProvider)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
      }
      return context;
}