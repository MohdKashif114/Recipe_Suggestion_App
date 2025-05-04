'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';

const WelcomePage = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login'); 
  };

  return (
    <div className="bg-[#EFE3C2] min-h-screen flex flex-col justify-between">
      
      <NavBar />
      
      
      <section className="flex flex-col items-center justify-center py-16 px-6 text-center md:px-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#123524] mb-6">
          Welcome to Our Recipe Hub! 🍴
        </h1>
        <p className="text-lg md:text-xl text-[#3E7B27] max-w-2xl mx-auto mb-8">
          Start your culinary journey with us! Sign up to explore thousands of recipes, share your favorites, and much more.
        </p>
        <button
          onClick={handleGetStarted}
          className="px-8 py-4 bg-[#3E7B27] text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-[#123524] transition duration-300"
        >
          Get Started
        </button>
      </section>
      
      
      <footer className="py-4 bg-[#3E7B27] text-center text-white">
        <p>&copy; 2025 Recipe Hub. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
