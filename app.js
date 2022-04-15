const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

//config dotenv
dotenv.config()

// Connect to database
const dbcon = (() => {
  try {
    const resonse = mongoose.connect(process.env.MONGO_URL_OFFLINE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('connected to database')
  } catch (err) {
    console.log('connection error ' + err)
  }
})()

const app = express()

// configure middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(morgan('common'))

const gatewaysRoute = require('./routes/gateways')
const devicesRoute = require('./routes/devices')

app.use('/api/gateways', gatewaysRoute)
app.use('/api/devices', devicesRoute)

module.exports = app
