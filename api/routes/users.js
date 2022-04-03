const express = require('express');
const app = express.Router();
const { createPool } = require('mysql');
const bcrypt = require('bcryptjs')

//  https://console.clever-cloud.com/users/me/addons
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: 'shopreact'
});

app.post('/', (req, res) => {

  pool.query(`SELECT * FROM users`, async (error, data) => {
    let keys = Object.values(data)
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    hashedPass = await bcrypt.hash(password, 10)
    let confirmPassword = req.body.confirmPassword
    let pushData = false
    let responseObject = {
      username: username,
      success: false,
      usernameFailed: false,
      usernameLengthFailed: false,
      emailFailed: false,
      passwordLengthFailed: false,
      confirmPasswordFailed: false
    }
    let pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    for (i = 0; i < keys.length; i++) {
      if (keys[i].username != username && (username.length >= 6 && username.length < 25) && email.match(pattern) && (password.length > 6 && password.length < 25) && password == confirmPassword) {
        pushData = true
        responseObject.success = true
      }
      else {
        for (y = 0; y < keys.length; y++) {
          if (username == keys[y].username)
            responseObject.usernameFailed = true
        }
        if (username.length < 6 || username.length >= 25) {
          responseObject.usernameLengthFailed = true
        }
        if (!email.match(pattern)) {
          responseObject.emailFailed = true
        }
        if (password.length <= 6 || password.length >= 25) {
          responseObject.passwordLengthFailed = true
        }
        if (password != confirmPassword || password == '' || confirmPassword == "") {
          responseObject.confirmPasswordFailed = true
        }
        console.log('podaci nisu poslati na bazu')
        pushData = false
        break
      }
    }
    if (pushData) {
      pool.query(`INSERT INTO users (username, email, password, adminPrivileges) VALUES ('${username}', '${email}', '${hashedPass}', 0)`)
    }
    res.send(responseObject)
  })
})
app.post('/login', (req, res) => {
  pool.query(`SELECT * FROM users`, async (error, data) => {
    console.log(req.body)
    let keys = Object.values(data)
    let username = req.body.username
    let password = req.body.password
    let proceed = {
      loginSuccessful: false,
      username: '',
      adminPrivileges: 0,
    }
    for (i = 0; i < keys.length; i++)

      if (username == keys[i].username && (await bcrypt.compare(password, keys[i].password))) {
        proceed.loginSuccessful = true
        proceed.username = keys[i].username
        proceed.adminPrivileges = keys[i].adminPrivileges
        break
      }
    res.send(proceed)
  })
})

app.put('/update', (req, res) => {
  pool.query(`SELECT * FROM users`, async (error, data) => {

    let keys = Object.values(data)
    let username = req.body.username
    let password = req.body.password
    let confirmPassword = req.body.confirmpassword
    let oldUsername = req.body.oldUsername
    let proceed = {
      loginSuccessful: false,
      usernameExists: false,
      passwordFailed: false,
      passwordNoMatch: false
    }
    if (password !== confirmPassword || password === '') {
      proceed.passwordNoMatch = true
    }
    for (i = 0; i < keys.length; i++) {
      if (oldUsername == keys[i].username && (await bcrypt.compare(password, keys[i].password))) {
        proceed.loginSuccessful = true
        proceed.username = keys[i].username
        break
      }
    }
    for (i = 0; i < keys.length; i++) {
      if (username == keys[i].username) {
        console.log('Username already exists')
        proceed.usernameExists = true
        break
      }
    }
    res.send(proceed)
  })
})



module.exports = app;
