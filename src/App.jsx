import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/layout'
import Home from './page/home/home'
import About from './page/about/about'
import Contact from './page/contact/contact'
import SignUp from './page/signUp/signUp'
import LogIn from './page/logi in/logIn'
import NotFound from './page/notFould/notFould'
import MyAccount from './page/Account/account'
import ChackOut from './page/chackOut/chackOut'
import Info from './page/Info/info'

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
          path:'/checkOut',
          element:<ChackOut/>
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
