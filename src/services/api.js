import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-rest-finance.herokuapp.com/'
})

