import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from './config'
import routers from './routers'

const app = express()

const PORT = process.env.PORT || 8000

mongoose.connect(config.mongoose.uri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`))


// const originList = ['http://localhost:3000', 'https://twstartup.com']
// const coresOptions = {
//   origin: function (origin, callback) {
//     if (originList.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else if (origin === undefined) {
//       callback(null, true)// assume is postman
//     } else {
//       callback(new Error('Not allow by cors'))
//     }
//   },
//   credentials: true,
//   optionsSuccessStatus: 200
// }

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())

app.use('/', routers)

app.listen(PORT, () => {
  console.log(`Server connected at ${PORT}`)
})
