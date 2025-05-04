'use client'

import Cards from "@/components/Cards";
import SearchBar from "@/components/SearchBar";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/authcontext/Authcontext";
import { Hourglass,Grid } from 'react-loader-spinner'




export default function Home() {
  
  const auth=useAuth();

 
  


 
  if (!auth.posts) return <div className="bg-[#EFE3C2] h-screen w-screen flex justify-center items-center"><Hourglass
  visible={true}
  height="80"
  width="80"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['#123524', '#3E7B27']}
  /></div>
  
  

  return (
    <div className="flex flex-col  items-center bg-[#EFE3C2] overflow-hidden">
      <NavBar/>
      <SearchBar/>
      


      {
        auth.loading ? (
          <div className="flex flex-col justify-center items-center h-screen pb-96 gap-4">
            <Grid
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="grid-wrapper"
            />
            <p className="text-center text-sm text-[#123524] px-4">
              Press the Refresh button if some recipes fail to appear!
            </p>
          </div>
        ) : (
          <Cards {...auth.posts} />
        )
        
      }
      
    </div>
  )
  
  
 

  
}
