import { Route, createBrowserRouter, createRoutesFromChildren, RouterProvider } from 'react-router-dom'

//Pages
import Dashboard from './Pages/Dashboard';
import Notification from './Pages/Notification';
import RoomList from './Pages/RoomList';
import GuestList from './Pages/GuestList';
import OrderList from './Pages/OrderList';

// Layouts
import RootLayout from './Layouts/RootLayout';
import ChildLayout from './Layouts/ChildLayout'
import './App.css'


const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path='/'>
        <Route path='/' element={(<RootLayout/>)}>
          <Route index element={<Dashboard/>}/>
          <Route path="Notification" element={<Notification/>}/>
        </Route>
        <Route path='/' element={(<ChildLayout/>)}>
          <Route path="RoomList" element={<RoomList/>}/>
          <Route path="GuestList" element={<GuestList/>}/>
          <Route path="OrderList" element={<OrderList/>}/>
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
