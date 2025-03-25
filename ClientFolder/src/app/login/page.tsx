'use client'
import React from 'react'
import { useState,useActionState } from 'react'
import NavBar from '../../components/NavBar'
import { loginValidation } from '../../api/loginauth'
import { authhook } from '@/authcontext/Authcontext'

interface information{
    email:string ,
    password:string
}


const page = () => {
    const auth=authhook();
    const [information,setInformation]=useState<information>({email:"",password:""});
    const [loading,setloading]=useState<boolean>(false);

    const handleinformation=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setInformation((prev)=>({
            ...prev,
            [event.target.name]:event.target.value
        }))
        console.log(information);
    }



     const loginhandler=async(event:React.FormEvent<HTMLFormElement>)=>{
                event.preventDefault();
                setloading(true);
                try{
                    const res=await fetch("http://localhost:6500/auth/login",{
                      method:"POST",
                      headers:{
                        "Content-Type":"application/json"
                      },
                      body:JSON.stringify({password:information.password,username:information.email}),
                      credentials:"include"
                    })
                
                    const finalres=await res.json();
                    console.log(finalres);
                    console.log("login is successfull")
                    auth.setUser(information.email)
                    setloading(false);
                    return{
                      ...finalres,
                      message:"login successfull"
                    }
                
                
                  }catch(err){
                    setloading(false);
                    console.log("some err occurred while logging in",err)
                    return {message:"some err occurred"}
                  }
            }
   


  return (
    <div>
        <NavBar/>
        <form onSubmit={loginhandler} className='flex flex-col gap-4 items-center'>
        <h1>Ello!! This is a login page</h1>
            <div className=''>
                <label>Enter Username:</label>
                <input
                    placeholder='Enter your email'
                    id="email"
                    name="email"
                    value={information.email}
                    onChange={(e)=>handleinformation(e)}
                ></input>
            </div>
            <div>
                <label>Enter Password:</label>
                <input
                    placeholder='Enter your password'
                    id="password"
                    name="password"
                    value={information.password}
                    onChange={(e)=>handleinformation(e)}
                ></input>
            </div>
            <button>Submit</button>
        </form>
        <div>
            {loading?(<p>loading...</p>):(
                <>
                {/* {data?.errors && <p className='text-red-600'>{data.errors.email}</p>}
                {data?.message && <p className='text-green-600'>{data.message}</p>} */}
                </>)
            }
            
        </div>
        
    </div>
  )
}

export default page