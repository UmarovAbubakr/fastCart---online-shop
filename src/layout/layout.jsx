import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import whishList from './../assets/whishList.svg'
import cart from './../assets/cart.svg'
import user from './../assets/user.svg'
import fastCard from './../assets/fastCard.svg'
import icon from './../assets/icon.svg'
import facebook from './../assets/facebook.svg'
import twiter from './../assets/twiter.svg'
import instagram from './../assets/insatgram.svg'
import linkedin from './../assets/linkedin.svg'

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            <nav className="relative px-4 py-4 flex justify-between items-center bg-white border-b border-gray-200 lg:px-10">

                <div className="flex items-center gap-4">
                    <Link to='/' className="flex-shrink-0">
                        <img src={fastCard} alt="Logo" className="h-8 lg:h-10" />
                    </Link>
                    <button className="hidden md:block px-4 py-2 border-2 border-black rounded-md font-bold hover:bg-black hover:text-white transition-all">
                        Каталог
                    </button>
                </div>

                <div className="lg:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                <div className="hidden lg:flex items-center gap-8 font-medium">
                    <Link to='/' className="hover:underline">Home</Link>
                    <Link to='/contact' className="hover:underline">Contact</Link>
                    <Link to='/about' className="hover:underline">About</Link>
                    <Link to='/signUp' className="hover:underline">Sign Up</Link>
                </div>

                <div className="hidden md:flex items-center gap-5">
                    <div className="flex items-center bg-[#f5f5f5] px-3 py-2 rounded">
                        <input
                            placeholder="What are you looking for?"
                            className="bg-transparent outline-none text-sm w-[150px] lg:w-[200px]"
                            type="text"
                        />
                        <img src={icon} alt="" className="w-4 h-4" />
                    </div>
                    <img src={whishList} alt="Wishlist" className="cursor-pointer w-6" />
                    <img src={cart} alt="Cart" className="cursor-pointer w-6" />
                    <Link to='/account'>
                        <img src={user} alt="User" className="cursor-pointer w-6" />
                    </Link>
                </div>

                <div className={`${isOpen ? 'block' : 'hidden'} absolute top-full left-0 w-full bg-white z-50 border-b border-gray-200 lg:hidden shadow-lg`}>
                    <div className="flex flex-col p-4 gap-4">
                        <Link onClick={() => setIsOpen(false)} to='/' className="text-lg">Home</Link>
                        <Link onClick={() => setIsOpen(false)} to='/contact' className="text-lg">Contact</Link>
                        <Link onClick={() => setIsOpen(false)} to='/about' className="text-lg">About</Link>
                        <Link onClick={() => setIsOpen(false)} to='/signUp' className="text-lg">Sign Up</Link>
                        <hr />
                        <div className="flex gap-6 py-2">
                            <img src={whishList} alt="Wishlist" />
                            <img src={cart} alt="Cart" />
                            <Link to='/account'>
                                <img src={user} alt="User" />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="bg-black text-white p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
                <div>
                    <div className='text-xl font-bold mb-4'>Exclusive</div>
                    <div className="mb-2">Subscribe</div>
                    <div className='text-sm mb-4'>Get 10% off your first order</div>
                    <div className='border-2 border-white rounded-[5px] flex p-2'>
                        <input placeholder='Enter your email' className='bg-transparent outline-none text-sm flex-grow' type="text" />
                        <img src={icon} alt="" className="w-5" />
                    </div>
                </div>
                <div>
                    <div className='font-bold mb-4'>Support</div>
                    <div className='text-sm mb-2'>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</div>
                    <div className='text-sm mb-2'>exclusive@gmail.com</div>
                    <div className='text-sm'>+88015-88888-9999</div>
                </div>
                <div>
                    <div className='font-bold mb-4'>Account</div>
                    <div className='text-sm mb-2 cursor-pointer'>My Account</div>
                    <div className='text-sm mb-2 cursor-pointer'>Cart</div>
                    <div className='text-sm mb-2 cursor-pointer'>Wishlist</div>
                    <div className='text-sm cursor-pointer'>Shop</div>
                </div>
                <div>
                    <div className='font-bold mb-4'>Quick Link</div>
                    <div className='text-sm mb-2 cursor-pointer'>Privacy Policy</div>
                    <div className='text-sm mb-2 cursor-pointer'>Terms Of Use</div>
                    <div className='text-sm mb-2 cursor-pointer'>FAQ</div>
                    <div className='text-sm cursor-pointer'>Contact</div>
                </div>
                <div>
                    <div className='font-bold mb-4'>Social</div>
                    <div className='flex gap-4'>
                        <img src={facebook} alt="FB" className="w-6" />
                        <img src={twiter} alt="TW" className="w-6" />
                        <img src={instagram} alt="IN" className="w-6" />
                        <img src={linkedin} alt="LN" className="w-6" />
                    </div>
                </div>
            </footer>
            <div className='bg-black text-gray-500 py-4 text-center border-t border-gray-800 text-xs md:text-sm'>
                Copyright Rimel 2022. All right reserved
            </div>
        </div>
    )
}

export default Layout