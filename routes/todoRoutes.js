const express = require('express')
const router = express.Router()
const todoController = require('../controller/todocontroller')
const authMiddleware = require('../middleware/authMiddleware')
const { route } = require('./authRoutes')

router.get('/test', (req, res) => {
  res.send('todo route working')
})

// Get all todos
router.get('/todos', todoController.getAllTodos)

// / get one todo data
router.get('/todos/:todoId', todoController.getOnetodo)

// Create a new todo
router.post('/todos', todoController.createtodo)

// Update a todo
router.put('/todos/:todoId', todoController.updatetodo)

// Delete a todo
router.delete('/todos/:todoId', todoController.deletetodo)

// get the complette todo
router.get('/tasks/completed', todoController.completedtodo)

module.exports = router
