import React, { useState } from 'react'
import './login.scss'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [refUsernamePasswordMatch, setrefUsernamePasswordMatch] = useState('d-none')

  let body = {
    username: username,
    password: password
  }
  const port = process.env.PORT || '9000'
  const ip = process.env.REACT_APP_IP || 'https://api-react-stop.herokuapp.com/'

  
  function getDataUsers() {
    fetch(`${ip}users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(response => response.json().then(data => {
      if (data.loginSuccessful) {
        localStorage.removeItem('userInfo')
        let dataLocal = {
          username: data.username,
          adminPrivileges: data.adminPrivileges,
          picture: data.picture
      }
          localStorage.setItem('userInfo', JSON.stringify(dataLocal));
        navigate('/')
      }
      else{
        setrefUsernamePasswordMatch('')
      }
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();

  }
  return (
    <form className='login' onSubmit={handleSubmit} >
      <h2>Sign in</h2>
      <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
      <p className={refUsernamePasswordMatch}>Username and Password dont match</p>
      <button onClick={getDataUsers}>Sign in</button>
      <a href="/signup">Dont have an account? Sign up</a>
      <a href="/" onClick={() => {localStorage.removeItem('userInfo')}}>Continue as a Guest</a>
    </form>
  )
}

export default Login