import React, { useRef, useState, useEffect } from 'react'
import './sidebar.scss'
import { FaHome, FaHistory } from 'react-icons/fa'
import { MdAdminPanelSettings } from 'react-icons/md'
import { GoSignOut } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import Fader from '../../Fader/Fader'

const Sidebar = (props) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const refHome = useRef();
  const refHistory = useRef();
  const refAdmin = useRef();
  const [sFader, setsFader] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('userInfo')) !== null) {
      if (JSON.parse(localStorage.getItem('userInfo')).adminPrivileges == 1) {
        setIsAdmin(true)
      }
    }
  }, [])

  function writePanel(number, x) {
    if (number === 3 && isAdmin !== true) {
      console.log(isAdmin)
      console.log('U are the admin')
      setsFader(<Fader name='You are not an ADMIN!' type='danger'/>)
    } else {
      refHome.current.className = ''
      refHistory.current.className = ''
      refAdmin.current.className = ''
      props.SetPanel(number)
      x.target.className = 'activeButton'
    }
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
      {sFader}
    </div>
  )
}

export default Sidebar