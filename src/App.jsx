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


// const submitHandler = (event) => {
//   event.preventDefault()
//
//   const timeMinute = event.target.minute.value;
//   const timeSecond = event.target.second.value;
//   const youtubeAPI = event.target.youtubeAPI.value;
//
//   const allInfo = {
//     masterAudioUrl,
//     childFileData: childAudioDataList,
//     timeMinute,
//     timeSecond,
//     youtubeAPI,
//   }
//
//
//
//   fetch("http://localhost:5000/info", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(allInfo),
//   })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((er) => console.log(er));
//
// }