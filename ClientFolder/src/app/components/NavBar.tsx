import React from 'react'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div className='w-full h-20 flex bg-green-500 justify-around'>
        <div className='flex justify-around gap-3'>
            <Link href="/">About</Link>
            <Link href="/">Home</Link>
        </div>
        <div className='flex justify-around gap-3'>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
        </div>
    </div>
  )
}

export default NavBar;