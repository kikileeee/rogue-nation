import React, { useRef } from 'react'
import './sidebar.scss'
import { FaHome, FaHistory } from 'react-icons/fa'
import { MdAdminPanelSettings } from 'react-icons/md'
import { GoSignOut } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'

const Sidebar = (props) => {
  const refHome = useRef();
  const refHistory = useRef();
  const refAdmin = useRef();
  const navigate = useNavigate()
  function writePanel(number, x) {
    refHome.current.className = ''
    refHistory.current.className = ''
    refAdmin.current.className = ''
    document.getElementsByClassName('')
    props.SetPanel(number)
    x.target.className = 'activeButton'

  }
  return (
    <div className='sidebar'>
      <div className='bgPic'>
        <img src={require('../../ProductInfo/favicon.ico')} alt="" />
        <p>Admin</p>
      </div >
      <button onClick={(x) => writePanel(1, x)} className='activeButton' ref={refHome}><FaHome />  Home</button>
      <button onClick={(x) => writePanel(2, x)} ref={refHistory}><FaHistory />  Order history</button>
      <button onClick={(x) => writePanel(3, x)} ref={refAdmin}><MdAdminPanelSettings /> Admin Panel</button>
      <button onClick={() => { navigate('/signup') }}><GoSignOut />  Sign Out</button>
    </div>
  )
}

export default Sidebar