import './App.css'
import { Route, createBrowserRouter, createRoutesFromChildren, RouterProvider } from 'react-router-dom'
// guest///
//Pages
import Home from './Pages/guest/Home'
import PreviewRooms from "./Pages/guest/PreviewRooms"
import RoomsOverview from './Pages/guest/RoomsOverview'
import BookingOpt from './Pages/guest/BookingOpt'
import BookingConfirmed from './Pages/guest/BookingConfirmed.jsx'
import Profile from './Pages/guest/Profile.jsx'
import LogIn from './Pages/guest/LogIn'
import SignUp from './Pages/guest/SignUp'
import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.withCredentials = true;

// Layouts
import RootLayout from './Layouts/guest/RootLayout'
import UnfoundPage from './Pages/guest/UnfoundPage'
import ErrorLayout from './Layouts/guest/ErrorLayout'

// admin
//Pages
import Dashboard from './Pages/admin/Dashboard';
import Notification from './Pages/admin/Notification';
import RoomList from './Pages/admin/RoomList';
import GuestList from './Pages/admin/GuestList';
import OrderList from './Pages/admin/OrderList';

// Layouts
import RootLayout2 from './Layouts/admin/RootLayout';
import ChildLayout from './Layouts/admin/ChildLayout'
import PopularRooms from './Pages/guest/PopularRooms.jsx'


const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path='/'>
        {/* guest */}
        <Route path='/' element={(<RootLayout/>)}>
          <Route index element={<Home/>}/>
          <Route path="RoomOverview/:id" element={<RoomsOverview/>}/>
          <Route path="PreviewRooms" element={<PreviewRooms/>}/>
          <Route path="LogIn" element={<LogIn/>} />
          <Route path="BookingOpt/:id" element={<BookingOpt/>} />
          <Route path="BookingConfirmed" element={<BookingConfirmed/>} />
          <Route path="Profile" element={<Profile/>} />
          <Route path="PopularRooms" element={<PopularRooms/>} />
        </Route>
        <Route path='/'>
          <Route path="SignUp" element={<SignUp/>}/>
        </Route>
        {/* admin pages */}
        <Route path='/admin'>
          <Route element={(<RootLayout2/>)}>
            <Route index element={<Dashboard/>}/>
            <Route path="Notification" element={<Notification/>}/>
          </Route>
          <Route element={(<ChildLayout/>)}>
            <Route path="RoomList" element={<RoomList/>}/>
            <Route path="GuestList" element={<GuestList/>}/>
            <Route path="OrderList" element={<OrderList/>}/>
          </Route>
        </Route>
        {/* ///// */}
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
