import React, { useState, useEffect } from 'react'
import { Layout } from '../components/Layout'
import axios from 'axios'
import { OrderForm } from '../form/OrderForm'
import { Order } from '../../types'
import { ClientOrderCard } from '../components/ClientOrderCard'
import { DriverOrders } from '../components/DriverOrders'
import { DriverOrderCard } from '../components/DriverOrderCard'
import { ClientPage } from './ClientPage'
import { DriverPage } from './DriverPage'

export const DashboardPage = () => {
  const [ userRole, setUserRole ] = useState()

  useEffect(() => {
    axios.get('/getUser').then(({ data }) => setUserRole(data.role))
  }, [])

  const Component = () => {
    if (userRole === 'клиент') return <ClientPage />
    if (userRole === 'водитель') return <DriverPage />
    return <></>
  }

  return Component()
}
