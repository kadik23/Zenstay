import { useState } from 'react'
import './App.css'
import { Route, createBrowserRouter, createRoutesFromChildren, RouterProvider } from 'react-router-dom'

//Pages
import Home from './Pages/Home'
import PreviewRooms from "./Pages/PreviewRooms"
import RoomsOverview from './Pages/RoomsOverview'
import LogIn from './Pages/LogIn'
import SignUp from './Pages/SignUp'
import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.withCredentials = true;

// Layouts
import RootLayout from './Layouts/RootLayout'


const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path='/'>
        <Route path='/' element={(<RootLayout />)}>
          <Route index element={<Home/>}/>
          <Route path="RoomsOverview" element={<RoomsOverview/>}/>
          <Route path="PreviewRooms" element={<PreviewRooms/>}/>
            <Route path="/LogIn" element={<LogIn/>} />
        </Route>
        <Route path='/'>
          <Route path="/SignUp" element={<SignUp/>}/>
        </Route>
      </Route>
    )
)

function App() {
  return (
      <RouterProvider router={router} />
  );
}
export default App
