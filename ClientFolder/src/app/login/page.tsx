'use client'
import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import { useAuth } from '@/authcontext/Authcontext';

interface information {
    email: string;
    password: string;
}

const Page = () => {
    const auth = useAuth();
    const [information, setInformation] = useState<information>({ email: "", password: "" });
    const [loading, setLoading] = useState<boolean>(false);

    const handleInformation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInformation(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("https://recipe-suggestion-app-vtq8.onrender.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: information.password,
                    username: information.email
                }),
                credentials: "include"
            });

            const finalRes = await res.json();
            console.log(finalRes);
            console.log("Login is successful");
            if(finalRes.success) auth.setUser(information.email);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log("some error occurred while logging in", err);
        }
    }

    return (
        <div className="min-h-screen bg-[#EFE3C2]">
            <NavBar />
            <div className="flex flex-col items-center justify-center p-8">
                <form onSubmit={loginHandler} className="bg-[#f1e3ba] p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4">
                    <h1 className="text-2xl font-bold text-center text-[#123524]">Login</h1>

                    <div className="flex flex-col gap-2">
                        <label className="text-[#123524]">Email / Username</label>
                        <input
                            className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#3E7B27]"
                            placeholder="Enter your email"
                            id="email"
                            name="email"
                            value={information.email}
                            onChange={handleInformation}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
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
