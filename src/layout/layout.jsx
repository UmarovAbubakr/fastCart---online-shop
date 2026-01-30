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
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout