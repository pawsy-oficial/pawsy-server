const mysql = require("mysql")

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'pawsy_database'
})

module.exports = db