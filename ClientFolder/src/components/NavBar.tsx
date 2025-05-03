import React, { useContext } from 'react'
import Link from 'next/link'
import { authhook } from '@/authcontext/Authcontext'






const NavBar = () => {
  const auth=authhook();
  const loggouthandler=async()=>{
    try{
      const res=await fetch("https://recipe-suggestion-app-vtq8.onrender.com/loggout",{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"});
      auth.setUser(null);
  
    }catch(err){
      console.log("error logging out",err);
    }
  }
  return (
    <div className='w-full h-20 flex bg-[#3E7B27] justify-between items-center'>
        <div className='flex justify-center gap-6 w-1/4'>
            <Link href="/">Home</Link>
            <Link href="/recipes">Recipes</Link>
        </div>
        <div className='flex justify-center gap-3 w-1/4'>
          {!auth.user?(
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
            </>
          ):(<Link href="/" onClick={loggouthandler}>logout</Link>)}
            
        </div>
    </div>
  )
}

export default NavBar;