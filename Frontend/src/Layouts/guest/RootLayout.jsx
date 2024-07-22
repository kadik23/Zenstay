import Header from '../../Components/guest/Header'
import Footer from '../../Components/guest/Footer'
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