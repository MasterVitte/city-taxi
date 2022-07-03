import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import * as React from 'react'
import Grid from '@mui/material/Grid'

export const Copyright = (props: any) => {
  return (
    <Grid container justifyContent="center">
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Artem Vitte
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Grid>
  )
}
