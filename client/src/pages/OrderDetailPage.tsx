import React, { useState, useEffect } from 'react'
import { Layout } from '../components/Layout'
import Grid from '@mui/material/Grid'
import { Card, CardContent } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Order } from '../../types'
import { useParams } from 'react-router'
import axios from 'axios'

export const OrderDetailPage = () => {
  const [ order, setOrder ] = useState<Order>()
  const [ status, setStatus ] = useState('')
  const { id } = useParams<any>()

  useEffect(() => {
    if (!id && id !== 0) return
    axios.post('/getOrder', { id }).then(({ data }) => setOrder(data))
  }, [id])

  useEffect(() => {
    if (!order?.status && order?.status !== 0) return
    axios.post('/getStatus', { id: order.status }).then(({ data }) => setStatus(data.name))
  }, [order?.status])

  return (
    <Layout>
      <Grid container justifyContent="center">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
              {status}
            </Typography>
            <Typography variant="body1" component="div">
              Клиент: {order?.client_id}
            </Typography>
            <Typography variant="body1" component="div">
              Водитель: {order?.driver_id}
            </Typography>
            <Typography variant="body1" component="div">
              Откуда: {order?.start_point}
            </Typography>
            <Typography variant="body1" component="div">
              Куда: {order?.finish_point}
            </Typography>
            <Typography variant="body1" component="div">
              Начало: {order?.start_time}
            </Typography>
            <Typography variant="body1" component="div">
              Конец: {order?.finish_time}
            </Typography>
            <Typography variant="body1" component="div">
              Цена: {order?.price || 0}р.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Layout>
  )
}
