import React, { useState, useEffect } from 'react'
import { User, Order } from '../../types'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { Card, CardContent, CardActions } from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export const DriverOrderCard = () => {
  const [ order, setOrder ] = useState<Order>()
  const [ status, setStatus ] = useState(0)

  const statusDriverNextState = (orderStatus: number) => {
    if (orderStatus === 2) return 'Я на месте'
    if (orderStatus === 3) return 'Поехали'
    if (orderStatus === 4) return 'Завершить'
  }

  useEffect(() => {
    axios.get('/getDriverActiveOrder').then(({ data }) => setOrder(data))
  }, [])

  useEffect(() => {
    if (!order?.status && order?.status !== 0) return
    axios.post('/getStatus', { id: order?.status }).then(({ data }) => setStatus(data.name))
  }, [order?.status])

  const onUpdateOrder = (id: string) => {
    axios.post('/updateOrder', { id, status })
  }

  const onCancelOrder = (id: string) => {
    axios.post('/cancelOrder', { id })
  }

  if (status === 4) {
    return <>{'Оцените заказ'}</>
  }

  return (
    <Grid container justifyContent="center">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="body1" component="div">
            Откуда: {order?.start_point}
          </Typography>
          <Typography variant="body1" component="div">
            Куда: {order?.finish_point}
          </Typography>
          <Typography variant="body1" component="div">
            Цена: {order?.price || 0}р.
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => onUpdateOrder(order?.id)} size="small">{statusDriverNextState(order?.status)}</Button>
          <Button onClick={() => onCancelOrder(order?.id)} size="small">Отменить заказ</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
