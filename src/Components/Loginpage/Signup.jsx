import React, { useState} from 'react'
import './login.scss'
import {  useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const [refUsername, setrefUsername] = useState('d-none')
  const [refUsernameSame, setrefUsernameSame] = useState('d-none')
  const [refEmail, setRefEmail] = useState('d-none')
  const [refPassword, setRefPassword] = useState('d-none')
  const [refPasswordSame, setRefPasswordSame] = useState('d-none')



  let data = {
    username: username,
    email: email,
    password: password,
    confirmPassword: confirmPassword
  }
  const port = process.env.PORT || '9000'
  const ip = process.env.REACT_APP_IP || 'https://api-react-stop.herokuapp.com/'
  function sendData() {
    fetch(`${ip}users`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      response.json().then(data => {

        console.table(data)
        ispisi(data)
        if (data.success) {
          navigate('/login')
        }
      })
    })

  }
  const handleSubmit = (e) => {
    e.preventDefault();

  }
  function ispisi(data) {
    console.log('ispis')
    if (data.usernameFailed) {
      setrefUsername('')
    }
    else {
      setrefUsername('d-none')
    }
    if (data.usernameLengthFailed) {
      setrefUsernameSame('')
    }
    else {
      setrefUsernameSame('d-none')
    }
    if (data.emailFailed) {
      setRefEmail('')
    }
    else {
      setRefEmail('d-none')
    }
    if (data.passwordLengthFailed) {
      setRefPassword('')
    }
    else {
      setRefPassword('d-none')
    }
    if (data.confirmPasswordFailed) {
      setRefPasswordSame('')
    }
    else {
      setRefPasswordSame('d-none')
    }

  }

  return (
    <form className='login' onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <p className={refUsername}>Username must have more than 6 Characters</p>
      <p className={refUsernameSame}>Account with that username already exists</p>
      <input type="email" placeholder="Email address" onChange={e => setEmail(e.target.value)}></input>
      <p className={refEmail}>Email address must be valid</p>
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
      <p className={refPassword}>Password must have atleast 6 Characters</p>
      <input type="password" placeholder="Confirm Password" onChange={e => setconfirmPassword(e.target.value)}></input>
      <p className={refPasswordSame}>Passwords must be the same</p>
      <button onClick={sendData}>Sign up</button>
      <a href="/login">Already have an account? Sign in</a>
      <a href="/" onClick={ () => { localStorage.removeItem('userInfo') }}>Continue as a Guest</a>
    </form>
  )
}

export default Login