const mysql = require('mysql')

const database_name = 'taxi'

const useDb = `USE ${database_name}`

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'password',
  db: 'taxi'
})

connection.connect(err => {
  if (err) {
    return console.log(err)
  }

  connection.query(useDb, useErr => {
    if (useErr) throw useErr
  })

  return console.log('connect DB!')
})

module.exports = {connection, database_name}

