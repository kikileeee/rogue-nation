import { color } from '@mui/system'
import React, { useState, useEffect } from 'react'
import './home.scss'

const Home = () => {

  const port = process.env.PORT || '9000'
  const ip = process.env.REACT_APP_IP || 'http://192.168.1.113:9000/'


  const [user, setUser] = useState('Guest')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [warningLogin, setWarningLogin] = useState()
  const [warningUsernameExists, setwarningUsernameExists] = useState()
  const [warningPasswordDoesntMatch, setwarningPasswordDoesntMatch] = useState()
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [warningTerms, setWarningTerms] = useState()

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
  function sendData() {
    setWarningTerms()
    let body = { password: password, username: username, confirmpassword: confirmpassword, oldUsername: user }

    fetch(`${ip}users/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(response => response.json().then(data => {
      console.log(data)
      let userInfo = data.userInfo

      setPassword('')
      setConfirmPassword('')
      if (data.loginSuccessful && data.passwordMatch && !data.usernameExists && termsAgreed) {
        localStorage.removeItem('userInfo')
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        window.location.reload();
      } else {
        if (!data.loginSuccessful) {
          setWarningLogin(<p>Password is wrong</p>)
        } else {
          setWarningLogin()
        }
        if (!data.passwordMatch) {
          setwarningPasswordDoesntMatch(<p>Passwords doesnt match</p>)
        } else {
          setwarningPasswordDoesntMatch()
        }
        if (data.usernameExists) {
          setwarningUsernameExists(<p>Username is unavailable</p>)
        } else {
          setwarningUsernameExists()
        }
        if (termsAgreed) {
          setWarningTerms()
        } {
          setWarningTerms(<p className='warning'>Terms and not agreed</p>)
        }
      }

    }
    ))

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
          <input type="checkbox" name="" id="iaccept" onChange={() => { if (termsAgreed) { setTermsAgreed(false) } else { setTermsAgreed(true) } }} />

        </label>{warningTerms}
      </div>

      <div className='changeName'>
        <label htmlFor="">New Username
          <input type="text" placeholder={user} value={username} onChange={e => setUsername(e.target.value)} />{warningUsernameExists}
        </label>
      </div>
      <div className='changeName'>
        <label htmlFor="">Enter the Password
          <input type="password" value={password} placeholder='Password' onChange={e => setPassword(e.target.value)} />{warningLogin}
        </label>
      </div>
      <div className='changeName'>
        <label htmlFor="">Repeat the Password
          <input type="password" value={confirmpassword} placeholder='Confirm the password' onChange={e => setConfirmPassword(e.target.value)} />
          {warningPasswordDoesntMatch}
        </label>
      </div>
      <button className='change' onClick={sendData}>Change Username</button>
    </div>
  )
}

export default Home