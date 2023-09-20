const mongoose = require('mongoose')

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Todo', todoSchema)
