import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-8xl md:text-9xl font-medium tracking-tight text-black">
        404 Not Found
      </h1>
      
      <p className="mt-6 text-sm md:text-base text-gray-800 text-center">
        Your visited page not found. You may go home page.
      </p>
      <Link 
        to="/" 
        className="mt-12 bg-[#DB4444] text-white px-10 py-4 rounded font-medium hover:bg-[#c13a3a] transition-all active:scale-95"
      >
        Back to home page
      </Link>
    </div>
  );
};

export default NotFound;