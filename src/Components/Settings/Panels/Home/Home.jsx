import React, { useState, useEffect } from 'react'
import './home.scss'

const Home = () => {
  const [user, setUser] = useState('Guest')
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('userInfo')) !== null) {
      setUser(JSON.parse(localStorage.getItem('userInfo')).username)
    }
    else {
      setUser('Guest')
    }
  }, [])
  return (
    <div className='homePanel'>
      <div className='terms'>
        <h2>Terms and Conditions<br /><br /></h2>
        <h3>Welcome to Roguenation!<br /><br /></h3><p>
          These terms and conditions outline the rules and regulations for the use of RogueNation's
          Website, located at roguenation.com.<br />
          By accessing this website we assume you accept these terms and conditions.<br /> Do not continue
          to use roguenation if you do not agree to take all of the terms and conditions stated on this page.</p>
        <label htmlFor="iaccept"><b>I Agree to the Terms of changing the password</b>
          <input type="checkbox" name="" id="iaccept" />
        </label>
      </div>
      
      <div className='changeName'>
        <label htmlFor="">Change the Username
          <input type="text" placeholder={user} />
        </label>
      </div>
      <div className='changeName'>
        <label htmlFor="">Enter the Password
          <input type="text" placeholder='Password' />
        </label>
      </div>
      <div className='changeName'>
        <label htmlFor="">Repeat the Password
          <input type="text" placeholder='Confirm the password' />
        </label>
      </div>
      <button className='change'>Change Username</button>
    </div>
  )
}

export default Home