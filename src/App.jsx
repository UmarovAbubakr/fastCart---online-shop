import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/layout'
import Home from './page/home/home'
import About from './page/about/about'
import Contact from './page/contact/contact'
import SignUp from './page/signUp/signUp'
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
          path:'/conatact',
          element:<Contact/>
        },
        {
          path:'/about',
          element:<About/>
        },
        {
          path:'/signUp',
          element:<SignUp/>
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
