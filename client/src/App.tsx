import React from 'react'
import './App.css'
import { Routes } from './Routes'
import { BrowserRouter } from 'react-router-dom'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  )
}
