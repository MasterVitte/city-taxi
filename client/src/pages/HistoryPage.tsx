import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { Layout } from '../components/Layout'
import axios from 'axios'
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material'
import Paper from '@mui/material/Paper'
import { useHistory } from 'react-router-dom'

interface Order {
  id: string
  client_id: string
  driver_id: string
  start_point: string
  finish_point: string
  start_time: string
  finish_time: string
  client_rating: string
  driver_rating: string
  price: string
  status: string
}

export const HistoryPage = () => {
  const history = useHistory()
  const [ user, setUser ] = useState()
  const [ orderHistory, setOrderHistory ] = useState<Order[]>()

  useEffect(() => {
    axios.get('/getUser').then(({ data }) => setUser(data))
  }, [])

  useEffect(() => {
    if (!user?.role) return

    if (user.role === 'клиент') {
      axios.get('/getClientOrderHistory').then(({ data }) => setOrderHistory(data))
    }

    if (user.role === 'водитель') {
      axios.get('/getDriverOrderHistory').then(({ data }) => setOrderHistory(data))
    }

  }, [user])

  const goToOrder = (id: string) => {
    history.push(`/order/${id}`)
  }

  return (
    <Layout>
      <Typography variant="h4" style={{ paddingBottom: 16 }}>История заказов</Typography>
      {!!orderHistory?.length && <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Откуда</TableCell>
              <TableCell align="right">Куда</TableCell>
              <TableCell align="right">Начало</TableCell>
              <TableCell align="right">Конец</TableCell>
              <TableCell align="right">Цена</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderHistory.map((row: Order) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right"><Typography onClick={() => goToOrder(row.id)}>{row.id}</Typography></TableCell>
                <TableCell align="right">{row.start_point}</TableCell>
                <TableCell align="right">{row.finish_point}</TableCell>
                <TableCell align="right">{row.start_time}</TableCell>
                <TableCell align="right">{row.finish_time}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      }
    </Layout>
  )
}
