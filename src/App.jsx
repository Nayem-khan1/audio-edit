import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import './App.css'
import Main from './layout/Main/Main'
import PrivateRoute from './routes/PrivateRoute'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Login></Login>
        },
        {
          path: "/home",
          element: <PrivateRoute><Home></Home></PrivateRoute>
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
