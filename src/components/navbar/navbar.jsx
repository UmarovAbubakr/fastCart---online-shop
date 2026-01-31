import { useNavigate } from 'react-router-dom'; // Добавь в импорты
import React, { useEffect, useState } from 'react';
import { Search, Heart, ShoppingCart, User, Settings, Menu, X, LogOut, CircleUser } from 'lucide-react';
import fastCard from './../../assets/fastCard.svg'
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
import { getProducts } from '../../api/productApi/productApi';
import { getCart } from './../../api/cart API/cartApi';
const Navbar = () => {
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
        <div>
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
                        ) : ''}
                    </ul>

                    <div className="flex items-center gap-3 md:gap-5">
                        <div className="relative hidden lg:flex items-center">
                            <input
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
                                        <div><CircleUser size={24} /></div>
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
    )
}

export default Navbar
