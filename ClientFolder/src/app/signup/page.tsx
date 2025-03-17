'use client'
import React from 'react'
import { useState,useActionState } from 'react';
import NavBar from '../components/NavBar';
import { signupValidation } from '../api/signupauth';

interface information{
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    confirmpassword:string,
    username:string
}



const page = () => {

     const [information,setInformation]=useState<information>({username:"",email:"",password:"",firstname:"",lastname:"",confirmpassword:""});
    //  const [data,formAction,isPending]=useActionState(signupValidation,undefined)
    const [loading,setloading]=useState<boolean>(false);


        const handleinformation=(event:React.ChangeEvent<HTMLInputElement>)=>{
            setInformation((prev)=>({
                ...prev,
                [event.target.name]:event.target.value
            }))
            console.log(information);
        }


        const signuphandler=async(event:React.FormEvent<HTMLFormElement>)=>{
            event.preventDefault();
            setloading(true);
            try{
                const res=await fetch("http://localhost:6500/auth/signup",{
                  method:"POST",
                  headers:{
                    "Content-Type":"application/json"
                  },
                  body:JSON.stringify({username:information.username,password:information.password,email:information.email}),
                  credentials:"include"
                })
            
                const finalres=await res.json();
                console.log(finalres);
                console.log("signup is successfull")
                setloading(false);
                return{
                  ...finalres,
                  message:"Signup successfull"
                }
            
            
              }catch(err){
                setloading(false);
                console.log("some err occurred",err)
                return {message:"some err occurred"}
              }
        }


    


  return (
    <div>
        <NavBar/>
            <form onSubmit={signuphandler} className='flex flex-col gap-4 items-center justify-center'>
            <h1>Ello!! This is a Signup page</h1>
                <div className=''>
                    <div>
                        <label>First Name</label>
                        <input
                        placeholder='First Name'
                        id="firstname"
                        name="firstname"
                        value={information.firstname}
                        onChange={(e)=>handleinformation(e)}
                    ></input>
                        <label>Last Name</label>
                        <input
                        placeholder='Last Name'
                        id="lastname"
                        name="lastname"
                        value={information.lastname}
                        onChange={(e)=>handleinformation(e)}
                    ></input>
                    </div>
                    <label>Enter Email:</label>
                    <input
                        placeholder='Enter your email'
                        id="email"
                        name="email"
                        value={information.email}
                        onChange={(e)=>handleinformation(e)}
                    ></input>
                    <label>Username:</label>
                    <input
                        placeholder='Enter your username'
                        id="username"
                        name="username"
                        value={information.username}
                        onChange={(e)=>handleinformation(e)}
                    ></input>
                </div>
                <div className='flex flex-col justify-center'>
                    <div>
                        <label>Enter Password:</label>
                        <input
                            type="password"
                            placeholder='Enter your password'
                            id="password"
                            name="password"
                            value={information.password}
                            onChange={(e)=>handleinformation(e)}
                        ></input>
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        
                        <input
                            placeholder='Confirm password'
                            id="confirmpassword"
                            name="confirmpassword"
                            value={information.confirmpassword}
                            onChange={(e)=>handleinformation(e)}
                        ></input>
                    </div>
                        
                </div>
                <button>Submit</button>
            </form>
            <div>
                {loading && <p>loading...</p>}
                {/* {isPending && (<p>submitting....</p>)}
                {data?.message && (<p className='bg-green-400'>{data.message}</p>)}
                {data?.errors && (<p className='bg-red-500'>{data.errors.password}</p>)} */}
            </div>
            
    </div>
  )
}

export default page