const express = require('express');
const app = express.Router();
const { createPool } = require('mysql');


//  https://console.clever-cloud.com/users/me/addons
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: 'shopreact'
  });

app.post('/', function (req, res, next) {
    console.log(req.body.productid)
    pool.query(`SELECT * FROM comment where productid = ${req.body.productid} group by commentid desc`, (error, data) => {
        res.send(data)
    })
});
app.put('/', function (req, res, next) {
    console.log(req.body)
    pool.query(`INSERT INTO comment ( comment, productid, user, date ) VALUES ('${req.body.comment}', '${req.body.productid}', '${req.body.user}', '${req.body.date}')`, (error, data) => {
        pool.query(`SELECT * FROM comment where productid = ${req.body.productid} group by commentid desc`, (error, dataSecond) => {
            res.send(dataSecond)
        })
    })

});

module.exports = app;