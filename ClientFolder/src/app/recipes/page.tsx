'use client'

import Cards from "@/components/Cards";
import SearchBar from "@/components/SearchBar";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/authcontext/Authcontext";




export default function Home() {
  
  const auth=useAuth();

 
  


 
  if (!auth.posts) return <div>Loading...</div>
  
  

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
