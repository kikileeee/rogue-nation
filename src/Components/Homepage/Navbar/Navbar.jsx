import React, { useState, useEffect } from 'react'
import './navbar.scss'
import AddShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Fader from '../../Fader/Fader'

const Navbar = (props) => {
  const navigate = useNavigate()
  const cartNumber = useSelector((state) => state)
  const [user, setUser] = useState('Guest')
  const [login, setLogin] = useState('Log in')
  const [sFader, setsFader] = useState()

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('userInfo')) !== null) {
      setUser(JSON.parse(localStorage.getItem('userInfo')).username)
      setLogin('Log out')
    }
    else {
      setLogin('Log in')
    }
  }, [])
  function resetData() {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cart')
  }
  function checkIfUser(){
    if (user === 'Guest'){ 
      setsFader(<Fader name='User must me logged in!' type='danger'/>)
    } else {
      navigate('/settings')
    }
  }

  return (
    <div className='navBarGap'>
      <nav className='navBar'>
        <ul>
          <div className='firstNav'>
            <li><a href="/"><img src={require('./roguetran.png')}></img></a></li>
          </div>
          <div className='secondNav'>
            
          <li> <a href="/products">Products</a></li>
            <li><a className='numberCart' href="/cart" data-after={props.cartNumber}><AddShoppingCartIcon /></a></li>
            <li>
              <div className="dropdown">
                <a className="dropbtn">{user}</a>
                <div className="dropdown-content">
                  <a className='aDrop' onClick={checkIfUser}>Settings</a>
                  <a href="login" className='aDrop' onClick={resetData}>{login}</a>
                </div>
              </div>


            </li>
          </div>
        </ul>
      </nav>
      
      {sFader}
    </div>
  )
}

export default Navbar