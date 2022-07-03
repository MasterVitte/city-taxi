import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import { useEffect, useState } from 'react'

const theme = createTheme()

export const OrderForm = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [price, setPrice] = useState(0)
  const history = useHistory()

  const onFromChange = (location: string) => {
    setFrom(location)
  }

  const onToChange = (location: string) => {
    setTo(location)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!from || !to) return

    axios.post('/order', {
      from,
      to,
      price
    }).then(() => history.push('/'))
  }

  const getRandomInt = (min: number, max: number) => {
    return Math.ceil(Math.random() * (max - min)) + min
  }

  useEffect(() => {
    setPrice(getRandomInt(100, 2000))
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Оформление заказа
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="from"
              label="Откуда"
              name="from"
              autoFocus
              onChange={e => onFromChange(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="to"
              label="Куда"
              id="to"
              onChange={e => onToChange(e.target.value)}
            />
            <Typography variant="h5">{from && to && 'Цена: ' + price + 'р.'}</Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Заказать
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
