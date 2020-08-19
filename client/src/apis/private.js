import axios from 'axios'

const request = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`
})
request.defaults.headers.common.access_token = localStorage.getItem('tw_token') || 'Unauthorized'
request.interceptors.request.use(config => {
  config.headers.authorization = `bearer ${localStorage.getItem('tw_token')}`
  return config
})

export default request
