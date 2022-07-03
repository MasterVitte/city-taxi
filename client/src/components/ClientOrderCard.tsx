import React, { useState, useEffect } from 'react'
import { Order, User } from '../../types'
import Typography from '@mui/material/Typography'
import { Card, CardContent, CardActions } from '@mui/material'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import axios from 'axios'

export const ClientOrderCard = () => {
  const [ order, setOrder ] = useState<Order>()
  const [ status, setStatus ] = useState(0)

  useEffect(() => {
    axios.get('/getClientActiveOrder').then(({ data }) => setOrder(data))
  }, [])

  useEffect(() => {
    if (!order?.status && order?.status !== 0) return
    axios.post('/getStatus', { id: order?.status }).then(({ data }) => setStatus(data.name))
  }, [order?.status])

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
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            {status}
          </Typography>
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
          {order?.status < 4 && <Button onClick={() => onCancelOrder(order?.id)} size="small">Отменить заказ</Button>}
        </CardActions>
      </Card>
    </Grid>
  )
}
