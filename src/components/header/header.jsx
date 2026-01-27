import React from 'react'
import { Link, Outlet } from 'react-router-dom'
const Layout = () => {
    return (
        <div>
            <ul className='mb-10 flex gap-[20px]'>
                <Link to={'/'}>
                    <li>Home</li>
                </Link>
                <Link to={'/contact'}>
                    <li>Contact</li>
                </Link>
                <Link to={'/about'}>
                    <li>About</li>
                </Link>
                <Link to={'/color'}>
                    <li>Color</li>
                </Link>
                <Link to={'/cart'}>
                    <li>Cart</li>
                </Link>
                <Link to={'/login'}>
                    <li>Login</li>
                </Link>
                <Link to={'/registration'}>
                    <li>Registration</li>
                </Link>
            </ul>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
