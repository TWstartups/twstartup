import axios from 'axios'
const token = localStorage.getItem('token')

const aClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/candidate`,
  'Access-Control-Allow-Origin': '*',
  headers: { authorization: `bearer ${token}` }
})
// TODO: check why this is not equivalent to
// a->export default axios.create({});
// a->will cause token to be null
export default aClient
