import { useNavigate } from 'react-router-dom'; // Добавь в импорты
import React, { useEffect, useState } from 'react';
import { Search, Heart, ShoppingCart, User, Settings, Menu, X, LogOut } from 'lucide-react';
import fastCard from './../assets/fastCard.svg'
import { Link, Outlet } from 'react-router-dom';
import { getProducts } from '../api/productApi/productApi';
import { useDispatch, useSelector } from 'react-redux';
import icon from '../assets/icon.svg';
import img1 from '../assets/facebook.svg';
import img2 from '../assets/insatgram.svg';
import img3 from '../assets/linkedin.svg';
import img4 from '../assets/twiter.svg';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button, Modal } from 'antd';
import { getCart } from '../api/cart API/cartApi';

const Layout = () => {
    const [search, setSearch] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [wishCount, setWishCount] = useState(0);

    const navigate = useNavigate();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        localStorage.clear();

        setIsModalOpen(false);
        dispatch(getCart())
        navigate('/signUp');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const { data } = useSelector((store) => store.todoCart)

    useEffect(() => {
        const updateCount = () => {
            const list = JSON.parse(localStorage.getItem('wishlist')) || [];
            setWishCount(list.length);
        };

        updateCount();
        window.addEventListener('wishlistUpdated', updateCount);
        return () => window.removeEventListener('wishlistUpdated', updateCount);
    }, []);

    useEffect(() => {
        dispatch(getProducts(search));
        dispatch(getCart())
    }, [dispatch, search]);
    const cartItems = data?.data?.[0]?.productsInCart;

    const token = localStorage.getItem('token')

    const uniquePositions = cartItems?.length

    return (
        <div className="min-h-screen flex flex-col">
            <nav className="border-b border-gray-200 bg-white py-4 sticky top-0 z-50">
                <div className="container mx-auto px-4 lg:px-10 flex items-center justify-between">

                    <button
                        className="md:hidden p-1"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    <Link to='/' className="flex items-center">
                        <img src={fastCard} alt="Logo" className="h-6 md:h-8" />
                    </Link>

                    <ul className="hidden md:flex items-center gap-8">
                        <Link to='/' className="hover:text-gray-600 transition"><li>Home</li></Link>
                        <Link to='/contact' className="hover:text-gray-600 transition"><li>Contact</li></Link>
                        <Link to='/about' className="hover:text-gray-600 transition"><li>About</li></Link>
                        {!token ? (
                            <Link to='/signUp' className="hover:text-gray-600 transition"><li>Sign Up</li></Link>
                        ):''}
                    </ul>

                    <div className="flex items-center gap-3 md:gap-5">
                        <div className="relative hidden lg:flex items-center">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Looking for?"
                                className="bg-[#f5f5f5] text-sm py-2 px-4 rounded w-[150px] xl:w-[240px] focus:outline-none"
                            />
                            <Search size={18} className="absolute right-3 cursor-pointer" />
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            <Link to="/wishlist" className="relative">
                                <Heart size={24} className="cursor-pointer hover:text-red-500 transition" />
                                {wishCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#db4444] text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                        {wishCount}
                                    </span>
                                )}
                            </Link>
                            <Link to='/cart' className="relative group">
                                <ShoppingCart size={24} className="group-hover:text-blue-500 transition" />
                                {uniquePositions > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#db4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                        {uniquePositions}
                                    </span>
                                )}
                            </Link>
                            {localStorage.getItem('token') && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div><Settings size={24} /></div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                            <Link className='flex gap-2 p-2 font-bold cursor-pointer hover:text-blue-500 transition' to='/account'>
                                                <User size={24} />
                                                User
                                            </Link>
                                        </DropdownMenuGroup>
                                        <DropdownMenuGroup onClick={showModal} className='flex gap-2 p-2 font-bold cursor-pointer hover:text-blue-500 transition'>
                                            <LogOut />
                                            Log Out
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 py-4 px-6 shadow-lg">
                        <ul className="flex flex-col gap-4 text-lg pt-50">
                            <Link to='/' onClick={() => setIsMenuOpen(false)}><li>Home</li></Link>
                            <Link to='/contact' onClick={() => setIsMenuOpen(false)}><li>Contact</li></Link>
                            <Link to='/about' onClick={() => setIsMenuOpen(false)}><li>About</li></Link>
                            <Link to='/signUp' onClick={() => setIsMenuOpen(false)}><li>Sign Up</li></Link>
                        </ul>
                    </div>
                )}
            </nav>

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className='bg-black text-white py-10 px-6'>
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className='flex flex-col gap-3'>
                        <h3 className='text-2xl font-bold'>Exclusive</h3>
                        <p>Subscribe</p>
                        <p className='text-sm text-gray-400'>Get 10% off your first order</p>
                        <div className='border border-white rounded p-2 flex justify-between'>
                            <input className='bg-transparent outline-none w-full text-sm' placeholder='Enter email' type="text" />
                            <img src={icon} alt="send icon" className="w-5" />
                        </div>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h3 className='text-xl font-bold'>Support</h3>
                        <p className='text-sm'>111 Bijoy sarani, Dhaka, Bangladesh</p>
                        <p className='text-sm'>exclusive@gmail.com</p>
                        <p className='text-sm'>+88015-88888-9999</p>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h3 className='text-xl font-bold'>Account</h3>
                        <p className='text-sm cursor-pointer'>My Account</p>
                        <p className='text-sm cursor-pointer'>Cart</p>
                        <p className='text-sm cursor-pointer'>Wishlist</p>
                        <p className='text-sm cursor-pointer'>Shop</p>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h3 className='text-xl font-bold'>Quick Links</h3>
                        <p className='text-sm cursor-pointer'>Privacy Policy</p>
                        <p className='text-sm cursor-pointer'>Terms Of Use</p>
                        <p className='text-sm cursor-pointer'>FAQ</p>
                        <p className='text-sm cursor-pointer'>Contact</p>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h3 className='text-xl font-bold'>Follow Us</h3>
                        <div className='flex items-center gap-4'>
                            <img src={img1} className="w-6 cursor-pointer" alt="fb" />
                            <img src={img2} className="w-6 cursor-pointer" alt="ig" />
                            <img src={img3} className="w-6 cursor-pointer" alt="in" />
                            <img src={img4} className="w-6 cursor-pointer" alt="tw" />
                        </div>
                    </div>
                </div>
            </footer>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Выйти"
                cancelText="Отмена"
                okButtonProps={{ danger: true }}
            >
                <p className="py-4">Вы уверены, что хотите выйти?</p>
            </Modal>
        </div>
    );
};

export default Layout