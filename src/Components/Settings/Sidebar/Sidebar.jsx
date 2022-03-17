import React from 'react'
import './sidebar.scss'
import { FaHome, FaHistory } from 'react-icons/fa'
import { MdAdminPanelSettings } from 'react-icons/md'
import { GoSignOut } from 'react-icons/go'

const Sidebar = (props) => {
  function writePanel(number, x) {
    document.getElementsByClassName('')
    props.SetPanel(number)
    x.target.className = 'activeButton'

  }
  return (
    <div className='sidebar'>
      <div className='bgPic'>
        <img src={require('../../ProductInfo/favicon.ico')} alt="" />
        <p>Admin</p>
      </div>
      <button onClick={(x) => writePanel(1, x)} className='activeButton'><FaHome />  Home</button>
      <button onClick={(x) => writePanel(2, x)}><FaHistory />  Order history</button>
      <button onClick={(x) => writePanel(3, x)}><MdAdminPanelSettings /> Admin Panel</button>
      <button onClick={() => console.log('sign out')}><GoSignOut />  Sign Out</button>
    </div>
  )
}

export default Sidebar