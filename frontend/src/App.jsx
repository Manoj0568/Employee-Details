import { useState } from 'react'
import Login from './components/AuthComp/Login'
import Signup from './components/AuthComp/Signup'
import Welcome from './components/MainComp/Welcome'
import DataModel from './components/MainComp/DataModel'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

function App() {
  let router = createBrowserRouter([
    {
      path:"/",
      element:<Welcome/>
    },{
      path:"/login",
      element:<Login/>
    },{
      path:"/signup",
      element: <Signup/>
    },{
      path:"*",
      element: <Login/>
    }
  ])

  return (
    <RouterProvider router = {router}></RouterProvider>
  )
}

export default App
