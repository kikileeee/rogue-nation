const express = require('express');
const app = express.Router();
const { createPool } = require('mysql');
const bcrypt = require('bcryptjs')
// sss
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
      passwordMatch: true,
      userInfo: {
        username: 'Guest',
        adminPrivileges: 0
      }
    }
    let userid = 0
    if (password !== confirmPassword || password === '') {
      proceed.passwordMatch = false
    }
    for (i = 0; i < keys.length; i++) {
      if (oldUsername == keys[i].username && (await bcrypt.compare(password, keys[i].password))) {
        proceed.userInfo.adminPrivileges = keys[i].adminPrivileges
        proceed.userInfo.username = username
        userid = keys[i].userid
        proceed.loginSuccessful = true
        proceed.username = keys[i].username
        break
      }
    }
    for (i = 0; i < keys.length; i++) {
      if (username == keys[i].username || username == '') {
        proceed.usernameExists = true
        break
      }
    }
    if (proceed.loginSuccessful && proceed.passwordMatch && !proceed.usernameExists) {
      pool.query(`UPDATE users SET username='${username}' where userid= ${userid}`, async (error, data) => {
      })
    }
    res.send(proceed)
  })
})
app.post('/order', (req, res) => {
  let reqData = req.body
  let danas = new Date()
  let date = danas.getFullYear() + '-' + (danas.getMonth() + 1) + '-' + danas.getDate()
  console.log(req.body)

  let orderNumber = Date.now()
  pool.query(`SELECT userid FROM users WHERE username='${req.body.user.username}'`, async (error, firstData) => {
    pool.query(`INSERT INTO orders (userID, orderNUMBER, orderDATE, shippingSTATUS) VALUES ('${firstData[0].userid}', '${orderNumber}', '${date}', 'Shipping')`, async (error, data) => {
      for (let i = 0; i < reqData.cart.length; i++) {
        pool.query(`INSERT INTO orderlistings (userID, productID, orderNUMBER, quantity) VALUES (${firstData[0].userid}, ${reqData.cart[i].productid}, ${orderNumber},${reqData.cart[i].quantity})`, async (error, data) => {
        })
      }
    })

    res.send()
  })
})
app.get('/order/:id', (req, res) => {
  console.log('get order')
  pool.query(`SELECT userid FROM users WHERE username='${req.params.id}'`, async (error, paramData) => {
    pool.query(`SELECT orderlistings.orderNUMBER, products.*, orders.orderDATE, orders.shippingSTATUS, orderlistings.quantity
              FROM orderlistings
              RIGHT JOIN products
              ON orderlistings.productID = products.productid
              RIGHT JOIN orders
              ON orders.orderNUMBER = orderlistings.orderNUMBER
              WHERE orderlistings.userid = ${paramData[0].userid}
              `, async (error, data) => {
      if (data == undefined) {
        console.log('data is undefined')
        res.send([])
      } else {
        let keys = Object.values(data)

        let newArr = []
        for (let i = 0; i < keys.length; i++) {
          if (newArr[0] == null) {
            newArr.push(keys[i].orderNUMBER)
          } else {
            for (let n = 0; n < newArr.length; n++) {
              if (newArr.includes(keys[i].orderNUMBER)) {
              } else {
                newArr.push(keys[i].orderNUMBER)
              }
            }
          }
        }
        let finalArr = []
        for (let i = 0; i < newArr.length; i++) {
          let partOfArr = []
          for (let n = 0; n < keys.length; n++) {
            if (newArr[i] == keys[n].orderNUMBER) {
              partOfArr.push(keys[n])
            }
          }
          finalArr.push(partOfArr)

        }
        console.log(finalArr)
        res.send(finalArr)
      }

    })
  })

})




module.exports = app;
