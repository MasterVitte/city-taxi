import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link as RouterLink } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export const ListItems = () => {
  const history = useHistory()

  const onLogout = () => {
    axios.post('/doLogout').then(() => {
      history.push('/login')
    })
  }

  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon/>
        </ListItemIcon>
        <RouterLink to="/">
          <ListItemText primary="Главная"/>
        </RouterLink>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon/>
        </ListItemIcon>
        <RouterLink to="/history">
          <ListItemText primary="История заказов"/>
        </RouterLink>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon/>
        </ListItemIcon>
        <RouterLink to="/profile">
          <ListItemText primary="Мой профиль"/>
        </RouterLink>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon/>
        </ListItemIcon>
        <ListItemText onClick={onLogout} primary="Выйти"/>
      </ListItemButton>
    </React.Fragment>
  )
}
