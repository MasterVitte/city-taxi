import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Order } from '../../types'
import { DriverOrders } from '../components/DriverOrders'
import { DriverOrderCard } from '../components/DriverOrderCard'
import { Layout } from '../components/Layout'

export const DriverPage = () => {
  const [ activeOrder, setActiveOrder ] = useState<Order>()

  useEffect(() => {
    axios.get('/getDriverActiveOrder').then(({ data }) => setActiveOrder(data))
  }, [])

  return <Layout>{!activeOrder ? <DriverOrders /> : <DriverOrderCard />}</Layout>
}
