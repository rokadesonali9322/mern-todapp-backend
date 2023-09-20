require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const connectionDb = require('./config/db')
// import route
const authRoutes = require('./routes/authRoutes')
const todoRoutes = require('./routes/todoRoutes')
const PORT = process.env.PORT || 8000

const app = express()

// db conection
connectionDb()

// middle wears
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}
app.use(cors(corsOptions))

app.get('/api', (req, res) => {
  res.send('home page')
})

// api routes
app.use('/api/auth', authRoutes)
app.use('/api/todo', todoRoutes)

app.listen(PORT, () => {
  console.log(`server is running  ${PORT}`)
})
