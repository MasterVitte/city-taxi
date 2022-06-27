const mysql = require("mysql");
const database_name = 'taxi'

const createDb = `CREATE DATABASE IF NOT EXISTS ${database_name}`
let useDb = `USE ${database_name}`

const createRoles = `CREATE TABLE IF NOT EXISTS roles
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_name TEXT NOT NULL
)`

const updateRoles = `INSERT INTO roles(role_name) VALUES ('client'), ('driver')`

const createUsers = `CREATE TABLE IF NOT EXISTS users
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username TEXT NOT NULL
    sex TEXT NOT NULL
    date_birthdate DATE NOT NULL
)`

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
})

connection.query(createDb, createErr => {
    if(createErr) throw createErr
    console.log("created DB!")

    connection.query(useDb, useErr => {
        if(useErr) throw useErr
        console.log("Using Database")
    })

    connection.query(createRoles, useErr => {
        if(useErr) throw useErr
        console.log("Created roles!")
    })

    connection.query(updateRoles, useErr => {
        if(useErr) throw useErr
        console.log("Updated roles!")
    })

    connection.query(createUsers, useErr => {
        if(useErr) throw useErr
        console.log("Created users!")
    })
})