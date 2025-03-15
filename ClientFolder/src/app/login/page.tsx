'use client'
import React from 'react'
import { useState,useActionState } from 'react'
import NavBar from '../components/NavBar'
import { loginValidation } from '../api/loginauth'

interface information{
    email:string ,
    password:string
}


const page = () => {

    const [information,setInformation]=useState<information>({email:"",password:""});
    const [data,formaction,isPending]=useActionState(loginValidation,undefined);

    const handleinformation=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setInformation((prev)=>({
            ...prev,
            [event.target.name]:event.target.value
        }))
        console.log(information);
    }

   


  return (
    <div>
        <NavBar/>
        <form action={formaction} className='flex flex-col gap-4 items-center'>
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
            {isPending?(<p>loading...</p>):(
                <>
                {data?.errors && <p className='text-red-600'>{data.errors.email}</p>}
                {data?.message && <p className='text-green-600'>{data.message}</p>}
                </>)
            }
            
        </div>
        
    </div>
  )
}

export default page