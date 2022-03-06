import React, { useState, useEffect } from 'react'
import './navbar.scss'
import AddShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = (props) => {
  const [user, setUser] = useState('Guest')
  const [login, setLogin] = useState('Log in')
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



  return (
    <div className='navBarGap'>
      <nav className='navBar'>
        <ul>
          <div className='firstNav'>
            <li><a href="/">RogueNation</a></li>
            <li> <a href="/products">Our products</a></li>
          </div>
          <div className='secondNav'>
            <li><a className='numberCart' href="/cart" data-after={props.cartNumber}><AddShoppingCartIcon /></a></li>
            <li>
              <div className="dropdown">
                <a className="dropbtn">{user}</a>
                <div className="dropdown-content">
                  <a href="#" className='aDrop'>Settings</a>
                  <a href="login" className='aDrop' onClick={resetData}>{login}</a>
                </div>
              </div>


            </li>
          </div>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar