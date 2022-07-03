const {connection, database_name} = require("./connect_db");

const createDb = `CREATE DATABASE IF NOT EXISTS ${database_name}`
const useDb = `USE ${database_name}`


const createOrderStatuses = `CREATE TABLE IF NOT EXISTS order_statuses
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL
)`

const createRoles = `CREATE TABLE IF NOT EXISTS roles
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL
)`

const createUsers = `CREATE TABLE IF NOT EXISTS users
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    role INT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    foreign key(role) references roles (id)
)`

const createTenant = `CREATE TABLE IF NOT EXISTS tenant
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    foreign key(user_id) references users (id)
)`

const createOrders = `CREATE TABLE IF NOT EXISTS orders
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    driver_id INT,
    start_point TEXT NOT NULL,
    finish_point TEXT NOT NULL,
    start_time DATETIME,
    finish_time DATETIME,
    client_rating INT,
    driver_rating INT,
    price INT,
    status INT,
    foreign key(client_id) references users (id),
    foreign key(driver_id) references users (id),
    foreign key(status) references order_statuses (id)
)`

const createCars = `CREATE TABLE IF NOT EXISTS cars
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    model TEXT NOT NULL
)`

const createRatings = `CREATE TABLE IF NOT EXISTS ratings
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    count INT NOT NULL,
    user_id INT NOT NULL,
    foreign key(user_id) references users (id)
)`

const insertOrderStatuses = `INSERT INTO order_statuses(name) VALUES ('поиск водителя'), ('ожидание водителя'), ('водитель ожидает вас'), ('в пути'), ('завершено'), ('отменен')`

const insertRoles = `INSERT INTO roles(name) VALUES ('клиент'), ('водитель')`

const queries = [createUsers, createTenant, createOrders, createCars, createRatings]

connection.query(createDb, createErr => {
  if (createErr) throw createErr

  connection.query(useDb, useErr => {
    if (useErr) throw useErr
  })

  connection.query(createOrderStatuses, createErr => {
    if (createErr) throw createErr

    connection.query(insertOrderStatuses, insertErr => {
      if (insertErr) throw insertErr
    })
  })

  connection.query(createRoles, createErr => {
    if (createErr) throw createErr

    connection.query(insertRoles, insertErr => {
      if (insertErr) throw insertErr
    })
  })

  queries.forEach(query => connection.query(query, err => {
    if (err) throw err
  }))
  console.log('done!')
})
