import React, { useState } from 'react'
import Footer from '../Homepage/Footer/Footer'
import Navbar from '../Homepage/Navbar/Navbar'
import AdminPanel from './Panels/AdminPanel/AdminPanel'
import Home from './Panels/Home/Home'
import OrderPanel from './Panels/OrderPanel/OrderPanel'
import './settings.scss'
import Sidebar from './Sidebar/Sidebar'

const Settings = (props) => {

    const [Panel, setPanel] = useState(1)
    function writePanel() {
        if (Panel == 1) {
            return <Home/>
        }
        else if (Panel == 2) {
            return <OrderPanel/>
        }
        else if (Panel == 3) {
            return <AdminPanel/>
        }
    }
    return (<>
        <Navbar cartNumber={props.cartNumber} setCartNumber={props.setCartNumber} />
        <div className='work'>
            <div className='workSidebar'>
                <Sidebar Panel={Panel} SetPanel={setPanel} />
            </div>
            <div className='workPanel'>
                {writePanel()}
            </div>
        </div>
        <Footer />
    </>
    )
}

export default Settings
