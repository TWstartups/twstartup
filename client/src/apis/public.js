import axios from 'axios'

const request = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`
})

export default request
