import React from 'react';
import { Link } from 'react-router-dom';
import googleIcon from './../../assets/iconGoogle.svg';

const SignUp = () => {
  return (
    <section className="flex items-center justify-center min-h-[80vh] px-4 py-10">
      <div className="w-full max-w-[370px] flex flex-col">
        
        <h2 className="text-3xl font-medium tracking-wide text-black mb-2">
          Create an account
        </h2>
        <p className="text-base text-black mb-10">
          Enter your details below
        </p>

        <form className="flex flex-col gap-8">
          <input 
            type="text" 
            placeholder="Name" 
            className="w-full border-b border-gray-400 pb-2 outline-none focus:border-black transition-colors"
          />
          <input 
            type="text" 
            placeholder="Email or Phone Number" 
            className="w-full border-b border-gray-400 pb-2 outline-none focus:border-black transition-colors"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full border-b border-gray-400 pb-2 outline-none focus:border-black transition-colors"
          />

          <div className="flex flex-col gap-4 mt-4">
            <button 
              type="submit" 
              className="w-full bg-[#DB4444] text-white py-4 rounded font-medium hover:bg-[#c13a3a] transition-colors"
            >
              Create Account
            </button>

            <button 
              type="button" 
              className="w-full border border-gray-400 py-4 rounded flex items-center justify-center gap-4 hover:bg-gray-50 transition-colors"
            >
              <img src={googleIcon} alt="Google" className="w-6 h-6" />
              <span>Sign up with Google</span>
            </button>
          </div>
        </form>

        <div className="mt-8 flex justify-center gap-4 text-gray-600">
          <span>Already have account?</span>
          <Link to="/LogIn" className="font-medium text-black border-b border-gray-500 hover:border-black pb-1 transition-all">
            Log in
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SignUp;