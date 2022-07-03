import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Order } from '../../types'
import { OrderForm } from '../form/OrderForm'
import { ClientOrderCard } from '../components/ClientOrderCard'
import { Layout } from '../components/Layout'

export const ClientPage = () => {
  const [ activeOrder, setActiveOrder ] = useState<Order>()

  useEffect(() => {
    axios.get('/getClientActiveOrder').then(({ data }) => setActiveOrder(data))
  }, [])

  return <Layout>{!activeOrder ? <OrderForm /> : <ClientOrderCard />}</Layout>
}
