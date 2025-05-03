'use client'
import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import { useAuth } from '@/authcontext/Authcontext';

interface information {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmpassword: string;
    username: string;
}

const Page = () => {
    const auth = useAuth();
    const [information, setInformation] = useState<information>({
        username: "",
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        confirmpassword: ""
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleInformation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInformation(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const signupHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        console.log(information);
        try {
            const res = await fetch("https://recipe-suggestion-app-vtq8.onrender.com/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: information.username,
                    password: information.password,
                    email: information.email
                }),
                credentials: "include"
            });

            const finalres = await res.json();
            console.log(finalres);
            console.log("Signup is successful");
            if(finalres.success==true){
                auth.setUser(information.username);
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log("some error occurred", err);
        }
    }

    return (
        <div className="min-h-screen bg-[#EFE3C2]">
            <NavBar />
            <div className="flex flex-col items-center justify-center p-8">
                <form onSubmit={signupHandler} className="bg-[#f1e3ba] p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4">
                    <h1 className="text-2xl font-bold text-center text-[#123524]">Sign Up</h1>
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-[#123524]">First Name</label>
                        <input
                            className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#3E7B27]"
                            placeholder="First Name"
                            id="firstname"
                            name="firstname"
                            value={information.firstname}
                            onChange={handleInformation}
                        />
                        
                        <label className="text-[#123524]">Last Name</label>
                        <input
                            className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#3E7B27]"
                            placeholder="Last Name"
                            id="lastname"
                            name="lastname"
                            value={information.lastname}
                            onChange={handleInformation}
                        />
                        
                        <label className="text-[#123524]">Email</label>
                        <input
                            className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#3E7B27]"
                            placeholder="Enter your email"
                            id="email"
                            name="email"
                            value={information.email}
                            onChange={handleInformation}
                        />
                        
                        <label className="text-[#123524]">Username</label>
                        <input
                            className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#3E7B27]"
                            placeholder="Enter your username"
                            id="username"
                            name="username"
                            value={information.username}
                            onChange={handleInformation}
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                        <label className="text-[#123524]">Password</label>
                        <input
                            type="password"
                            className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#3E7B27]"
                            placeholder="Enter your password"
                            id="password"
                            name="password"
                            value={information.password}
                            onChange={handleInformation}
                        />
                        
                        <label className="text-[#123524]">Confirm Password</label>
                        <input
                            type="password"
                            className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#3E7B27]"
                            placeholder="Confirm password"
                            id="confirmpassword"
                            name="confirmpassword"
                            value={information.confirmpassword}
                            onChange={handleInformation}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#3E7B27] text-white p-2 rounded hover:bg-[#2e5d1c] transition-all mt-4"
                    >
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Page;
