const express = require('express');
const cors = require("cors")
const bodyParser = require('body-parser');
const {connection} = require('./db/connect_db')

const server = "http://localhost:5000"

const corsOptions = {
  origin: server
};
const app = express();
const port = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/doRegister", (req, res) => {
  const {name, role, email, password} = req.body

  connection.query('SELECT * FROM users WHERE email = ?', email, function (error, results) {
    if (error) throw error;

    const isRegistered = results.length

    if (isRegistered) {
      return res.status(500).send('Такой пользователь уже зарегистрирован');
    }

    connection.query('SELECT * FROM roles WHERE name = ?', role, function (error, results) {
      if (error) throw error;

      const roleId = results?.[0]?.id

      if (!roleId && roleId !== 0) {
        return res.status(500).send('Роль не найдена');
      }

      connection.query('DELETE FROM tenant', function (error) {
        if (error) throw error;

        connection.query('INSERT INTO users SET ?', {
          name,
          role: roleId,
          email,
          password
        }, function (error, result) {

          connection.query('INSERT INTO tenant SET ?', {user_id: result.insertId}, function (error) {
            if (error) throw error;

            res.status(201).send({
              message: `Пользователь создан под Id: ${result.insertId}`
            });
          })
        })
      })
    })
  });
});

app.get("/checkLogin", (req, res) => {
  connection.query('SELECT * FROM tenant', function (error, result) {
    if (error) throw error;
    const isAuth = result.length
    res.status(200).send({isAuth: !!isAuth})
  })
})

app.post("/doLogin", (req, res) => {
  const {email, password} = req.body
  connection.query('SELECT * FROM users WHERE email = ?', email, function (error, result) {
    if (error) throw error;
    const user = result?.[0]

    if (!user || user.password !== password) {
      return res.status(500).send({
        message: 'Неверный email или пароль'
      })
    }

    connection.query('INSERT INTO tenant SET ?', {user_id: user.id}, function (error) {
      if (error) throw error;

      return res.status(200).send()
    })

  })
})

app.post("/doLogout", (req, res) => {
  connection.query('DELETE FROM tenant', function (error) {
    if (error) throw error;

    return res.status(200).send()
  })
})

app.get("/getUser", (req, res) => {
  connection.query('SELECT * FROM tenant', function (error, result) {
    if (error) throw error

    const userId = result?.[0]?.user_id

    if (!userId && userId !== 0) {
      return res.status(500).send()
    }

    connection.query('SELECT * FROM users WHERE id = ?', userId, function (error, result) {
      if (error) throw error

      const user = result?.[0]

      if (!user) {
        return res.status(500).send()
      }

      connection.query('SELECT * FROM roles WHERE id = ?', user.role, function (error, results) {
        if (error) throw error;

        const roleName = results?.[0]?.name

        res.status(200).send({...user, role: roleName})
      })

    })
  })
})

app.post("/getOrder", (req, res) => {
  const { id } = req.body

  connection.query('SELECT * FROM orders WHERE id = ?', id, function (error, result) {
    if (error) throw error

    const order = result?.[0]

    if (!order) {
      return res.status(404).send({ message: 'Заказ не найден' })
    }

    res.status(200).send(order)
  })
})

app.get("/getClientOrderHistory", (req, res) => {
  connection.query('SELECT * FROM tenant', function (error, result) {
    if (error) throw error

    const userId = result?.[0]?.user_id

    if (!userId && userId !== 0) {
      return res.status(500).send()
    }

    connection.query('SELECT * FROM orders WHERE client_id = ? AND status > 4', userId, function (error, results) {
      if (error) throw error

      res.status(200).send(results)
    })
  })
})

app.get("/getDriverOrderHistory", (req, res) => {
  connection.query('SELECT * FROM tenant', function (error, result) {
    if (error) throw error

    const userId = result?.[0]?.user_id

    if (!userId && userId !== 0) {
      return res.status(500).send()
    }

    connection.query('SELECT * FROM orders WHERE driver_id = ? AND status > 4', userId, function (error, results) {
      if (error) throw error

      res.status(200).send(results)
    })
  })
})

app.get("/getClientActiveOrder", (req, res) => {
  connection.query('SELECT * FROM tenant', function (error, result) {
    if (error) throw error

    const userId = result?.[0]?.user_id

    if (!userId && userId !== 0) {
      return res.status(500).send()
    }

    connection.query('SELECT * FROM orders WHERE client_id = ? AND status <> 5 AND status <> 6', userId, function (error, result) {
      if (error) throw error

      const order = result?.[0]

      if (!order) {
        return res.status(200).send()
      }

      res.status(200).send(order)
    })
  })
})

app.get("/getDriverActiveOrder", (req, res) => {
  connection.query('SELECT * FROM tenant', function (error, result) {
    if (error) throw error

    const userId = result?.[0]?.user_id

    if (!userId && userId !== 0) {
      return res.status(500).send()
    }

    connection.query('SELECT * FROM orders WHERE driver_id = ? AND status <> 5 AND status <> 6', userId, function (error, result) {
      if (error) throw error

      const order = result?.[0]

      if (!order) {
        return res.status(200).send()
      }

      res.status(200).send(order)
    })

  })
})

app.post("/order", (req, res) => {
  const { from, to, price } = req.body

  connection.query('SELECT * FROM tenant', function (error, result) {
    if (error) throw error

    const userId = result?.[0]?.user_id

    if (!userId && userId !== 0) {
      return res.status(500).send()
    }

    connection.query('INSERT INTO orders SET ?', { client_id: userId, start_point: from, finish_point: to, price, status: 1 }, function (error) {
      if (error) throw error;

      return res.status(200).send()
    })
  })
})

app.post("/cancelOrder", (req, res) => {
  const { id } = req.body

  connection.query('UPDATE orders SET status = 6 WHERE id = ?', id, function (error, result) {
    if (error) throw error

    res.status(200).send()
  })
})

app.get("/getSearchOrders", (req, res) => {
  connection.query('SELECT * FROM orders WHERE status = 1', function (error, results) {
    if (error) throw error

    res.status(200).send(results)
  })
})

app.post("/workOrder", (req, res) => {
  const { id, driver_id } = req.body

  connection.query(`UPDATE orders SET status = 2, driver_id = ${driver_id} WHERE id = ?`, id, function (error, results) {
    if (error) throw error

    res.status(200).send(results)
  })
})

app.post("/getStatus", (req, res) => {
  const { id } = req.body

  connection.query('SELECT * FROM order_statuses WHERE id = ?', id, function(error, result) {
    if (error) throw error

    const status = result?.[0]

    if (!status) {
      return res.status(404).send({ message: 'Статус не найден' })
    }

    res.status(200).send(status)
  })
})

app.post("/updateOrder", (req, res) => {
  const { id, status } = req.body

  connection.query('UPDATE orders SET status = status + 1 WHERE id = ?', id, function(error) {
    if (error) throw error

    return res.status(200).send()
  })
})
