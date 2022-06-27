const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'taxi'
})

connection.connect(err => {
    if (err) {
        return console.log('connect DB error!')
    }
    return console.log('connect DB!')
})

module.exports = connection