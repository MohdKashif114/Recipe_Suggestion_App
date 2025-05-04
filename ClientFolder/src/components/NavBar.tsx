import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/authcontext/Authcontext'

const NavBar = () => {
  const auth = useAuth();

  const loggouthandler = async () => {
    try {
      const res = await fetch("https://recipe-suggestion-app-vtq8.onrender.com/loggout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      console.log(await res.json());
      auth.setUser(null);
    } catch (err) {
      console.log("error logging out", err);
    }
  };

  return (
    <div className="w-full h-20 bg-[#3E7B27] flex justify-between items-center px-4 sm:px-6">
      
      <div className="flex gap-6">
        <Link href="/" className="text-white font-semibold hover:underline">Home</Link>
        <Link href="/recipes" className="text-white font-semibold hover:underline">Recipes</Link>
      </div>

      
      <div className="flex gap-6">
        {!auth.user ? (
          <>
            <Link href="/login" className="text-white font-semibold hover:underline">Login</Link>
            <Link href="/signup" className="text-white font-semibold hover:underline">Signup</Link>
          </>
        ) : (
          <Link href="/" onClick={loggouthandler} className="text-white font-semibold hover:underline">Logout</Link>
        )}
      </div>
    </div>
  )
}

export default NavBar;
