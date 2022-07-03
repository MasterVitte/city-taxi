import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Order, User } from '../../types'
import Typography from '@mui/material/Typography'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

export const DriverOrders = () => {
  const [ user, setUser ] = useState<User>()
  const [ orders, setOrders ] = useState<Order[]>()

  useEffect(() => {
    axios.get('/getSearchOrders').then(({ data }) => setOrders(data))
    axios.get('/getUser').then(({ data }) => setUser(data))
  }, [])

  const onWorkOrder = (id: string) => {
    axios.post('/workOrder', { id, driver_id: user?.id })
  }

  return (
    <>
    <Typography variant="h4" style={{ paddingBottom: 16 }}>Поиск заказов</Typography>
      {!!orders?.length && <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Клиент</TableCell>
              <TableCell align="right">Водитель</TableCell>
              <TableCell align="right">Откуда</TableCell>
              <TableCell align="right">Куда</TableCell>
              <TableCell align="right">Начало</TableCell>
              <TableCell align="right">Конец</TableCell>
              <TableCell align="right">Рейтинг клиента</TableCell>
              <TableCell align="right">Рейтинг водителя</TableCell>
              <TableCell align="right">Статус</TableCell>
              <TableCell align="right">Цена</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order: Order) => (
              <TableRow
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {order.client_id}
                </TableCell>
                <TableCell align="right">{order.driver_id}</TableCell>
                <TableCell align="right">{order.start_point}</TableCell>
                <TableCell align="right">{order.finish_point}</TableCell>
                <TableCell align="right">{order.start_time}</TableCell>
                <TableCell align="right">{order.finish_time}</TableCell>
                <TableCell align="right">{order.client_rating}</TableCell>
                <TableCell align="right">{order.driver_rating}</TableCell>
                <TableCell align="right">{order.status}</TableCell>
                <TableCell align="right">{order.price}</TableCell>
                <TableCell align="right"><Button onClick={() => onWorkOrder(order.id)}>Принять</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      }
      </>
  )
}
