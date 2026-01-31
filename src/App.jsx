import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/layout'
import Home from './pages/home/home'
import About from './pages/about/about'
import Contact from './pages/contact/contact'
import SignUp from './pages/signUp/signUp'
import LogIn from './pages/logi in/logIn'
import NotFound from './pages/notFould/notFould'
import MyAccount from './pages/Account/account'
import ChackOut from './pages/chackOut/chackOut'
import Info from './pages/Info/info'
import Cart from './pages/cart/cart'
import Products from './pages/products/products'
import WhishList from './pages/wishlist/whishList'

const App = () => {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          index:'/',
          element:<Home/>
        },
        {
          path:'/contact',
          element:<Contact/>
        },
        {
          path:'/about',
          element:<About/>
        },
        {
          path:'/signUp',
          element:<SignUp/>
        },
        {
          path:'/LogIn',
          element:<LogIn/>
        },
        {
          path:'/account',
          element:<MyAccount/>
        },
        {
          path:'/wishlist',
          element:<WhishList/>
        },
        {
          path:'/checkOut',
          element:<ChackOut/>
        },
        {
          path:'/products',
          element:<Products/>
        },
        {
          path:'/cart',
          element:<Cart/>
        },
        {
          path:'/Info',
          element:<Info/>
        },
        {
          path:'*',
          element:<NotFound/>
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
