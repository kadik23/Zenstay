import { Route, createBrowserRouter, createRoutesFromChildren, RouterProvider } from 'react-router-dom'

//Pages
import Dashboard from './Pages/Dashboard';

// Layouts
import RootLayout from './Layouts/RootLayout';
import './App.css'


const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path='/'>
        <Route path='/' element={(<RootLayout/>)}>
          <Route index element={<Dashboard/>}/>
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
