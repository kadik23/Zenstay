import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Outlet  } from 'react-router-dom'
export default function RootLayout(){

    return(
        <div className="root-layout">
            <Header />
            <Outlet />
            <div className='bg-body-secondary'>
                <div className="container">
                    <Footer />
                </div>
            </div>
        </div>
    )
}