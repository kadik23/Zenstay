import './App.css'
import { Route, createBrowserRouter, createRoutesFromChildren, RouterProvider } from 'react-router-dom'

//Pages
import Home from './Pages/Home'
import PreviewRooms from "./Pages/PreviewRooms"
import RoomsOverview from './Pages/RoomsOverview'
import BookingOpt from './Pages/BookingOpt'
import LogIn from './Pages/LogIn'
import SignUp from './Pages/SignUp'

// Layouts
import RootLayout from './Layouts/RootLayout'
import UnfoundPage from './Pages/UnfoundPage'
import ErrorLayout from './Layouts/ErrorLayout'


const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path='/'>
        <Route path='/' element={(<RootLayout/>)}>
          <Route index element={<Home/>}/>
          <Route path="RoomsOverview" element={<RoomsOverview/>}/>
          <Route path="PreviewRooms" element={<PreviewRooms/>}/>
          <Route path="LogIn" element={<LogIn/>} />
          <Route path="BookingOpt" element={<BookingOpt/>} />
        </Route>
        <Route path='/'>
          <Route path="SignUp" element={<SignUp/>}/>
        </Route>
        <Route path='/' element={<ErrorLayout/>}> 
          <Route path="*" element={<UnfoundPage/>} />
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
