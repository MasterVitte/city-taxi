import React, { useLayoutEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import axios from 'axios'
import { DashboardPage } from './pages/DashboardPage'
import { ProfilePage } from './pages/ProfilePage'
import { HistoryPage } from './pages/HistoryPage'
import { OrderDetailPage } from './pages/OrderDetailPage'

export const Routes = () => {
  const history = useHistory()
  useLayoutEffect(() => {
    axios.get('/checkLogin').then(({ data }) => {
      if (!data.isAuth && ![ '/login', '/register' ].includes(history.location.pathname)) {
        history.push('/login')
      }
    })
  }, [])

  return (
    <Switch>
      <Route path="/" component={DashboardPage} exact/>
      <Route path="/order/:id" component={OrderDetailPage} />
      <Route path="/history" component={HistoryPage} exact/>
      <Route path="/profile" component={ProfilePage} exact/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/register" component={RegisterPage}/>
    </Switch>
  )
}
