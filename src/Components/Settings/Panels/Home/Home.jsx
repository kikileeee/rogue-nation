import React, { useState, useEffect } from 'react'
import './home.scss'

const Home = () => {
  
  const port = process.env.PORT || '9000'
  const ip = process.env.REACT_APP_IP || 'http://192.168.1.113:9000/'


  const [user, setUser] = useState('Guest')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')

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
  function sendData(){
    if (user === username){
      console.log('Its same username')
    } else {
    let body = {password: password,username: username, confirmpassword:confirmpassword, oldUsername: user}
    fetch(`${ip}users/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(response => response.json().then(data =>{
      console.log(data)
    }))}
  }
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
        <label htmlFor="">New Username
          <input type="text" placeholder={user} onChange={e => setUsername(e.target.value)}/>
        </label>
      </div>
      <div className='changeName'>
        <label htmlFor="">Enter the Password
          <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />
        </label>
      </div>
      <div className='changeName'>
        <label htmlFor="">Repeat the Password
          <input type="password" placeholder='Confirm the password' onChange={e => setConfirmPassword(e.target.value)}/>
        </label>
      </div>
      <button className='change' onClick={sendData}>Change Username</button>
    </div>
  )
}

export default Home