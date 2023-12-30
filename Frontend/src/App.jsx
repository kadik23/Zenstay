import { useState } from 'react'
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Home from './Pages/Home'
import PreviewRooms from "./Pages/PreviewRooms"
import './App.css'
import LogIn from './Pages/LogIn'
import SignUp from './Pages/SignUp'

function App() {

  return (
    <>
      {/* <Header/> */}
      {/* <div className='Login'>
        <LogIn />
      </div> */}
      <div className='Signup'>
        <SignUp />
      </div>
      {/* <div className='bg-body-secondary'>
        <div className="container">
              <Footer />
        </div>
      </div> */}
    </>
  )
}

export default App
