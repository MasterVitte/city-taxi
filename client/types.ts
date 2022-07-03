export interface Order {
  id: string
  client_id: string
  driver_id: string
  start_point: string
  finish_point: string
  start_time: string
  finish_time: string
  client_rating: string
  driver_rating: string
  price: string
  status: number
}

export interface User {
  id: string
  name: string
  role: string
  email: string
  password: string
}
