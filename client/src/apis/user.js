import axios from 'axios';
const token = localStorage.getItem('token');

export default axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  'Access-Control-Allow-Origin': '*',
  headers:{'authorization':`bearer ${token}`}
})

