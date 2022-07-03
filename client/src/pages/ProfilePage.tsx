import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { Layout } from '../components/Layout'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { Card, CardContent } from '@mui/material'
import { User } from '../../types'

export const ProfilePage = () => {
  const [ user, setUser ] = useState<User>()

  useEffect(() => {
    axios.get('/getUser').then(({ data }) => setUser(data))
  }, [])

  if (!user) return null

  return (
    <Layout>
      <Grid container justifyContent="center">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
              Мой профиль
            </Typography>
            <Typography variant="body1" component="div">
              Имя: {user?.name}, {user?.role}
            </Typography>
            <Typography variant="body1">
              email: {user?.email}
              <br />
              password: {user?.password}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Layout>
  )
}
