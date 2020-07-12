const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./config/dev')
const bodyParser = require('body-parser')

const usersRoutes = require('./routes/users')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connected')
})

app.use('/api/v1/users', usersRoutes)

const PORT = process.env.PORT || '3001'

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log('I am running!'))