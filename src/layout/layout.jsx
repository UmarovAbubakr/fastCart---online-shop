import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import whishList from './../assets/whishList.svg'
import cart from './../assets/cart.svg'
import user from './../assets/user.svg'
import fastCard from './../assets/fastCard.svg'

const Layout = () => {
    return (
        <div>
            <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div><Link to='/'><img src={fastCard} alt="" /></Link></div>
                <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
                    <div><Link to='/home'>Home</Link></div>
                    <div><Link to='/contact'>Contact</Link></div>
                    <div><Link to='/about'>About</Link></div>
                    <div><Link to='/signUp'>Sign Up</Link></div>
                </div>
                <input style={{background:'#f5f5f5'}} type="text" />
                <img src={whishList} alt="" />
                <img src={cart} alt="" />
                <img src={user} alt="" />
            </nav>
            <div><Outlet /></div>
        </div>
    )
}

export default Layout
