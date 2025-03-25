import React, { useContext } from 'react'
import Link from 'next/link'
import { authhook } from '@/authcontext/Authcontext'






const NavBar = () => {
  const auth=authhook();
  const loggouthandler=async()=>{
    try{
      const res=await fetch("http://localhost:6500/loggout",{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"});
      auth.setUser(null);
  
    }catch(err){
      console.log("error logging out",err);
    }
  }
  return (
    <div className='w-full h-20 flex bg-[#3E7B27] justify-around'>
        <div className='flex justify-around gap-3'>
            <Link href="/">About</Link>
            <Link href="/">Home</Link>
        </div>
        <div className='flex justify-around gap-3'>
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