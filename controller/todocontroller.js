const TodoModel = require('./../models/Todo')

// get all todo get
exports.getAllTodos = async (req, res) => {
  const todo = await TodoModel.find()
  res.json(todo)
}
// get one todo get :todoid
exports.getOnetodo = async (req, res) => {
  const todo = await TodoModel.find({ _id: req.params.todoId })
  res.json(todo)
}

// craeate todo post
exports.createtodo = async (req, res) => {
  const todo = TodoModel(req.body)
  res.send(await todo.save())
}

// update todo put

exports.updatetodo = async (req, res) => {
  const _id = req.params.todoId
  const updatedTaskData = req.body

  try {
    const updatedTask = await TodoModel.findByIdAndUpdate(
      _id,
      updatedTaskData,
      {
        new: true,
      },
    )

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json(updatedTask)
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.deletetodo = async (req, res) => {
  try {
    const deletedTask = await TodoModel.findOneAndDelete({
      _id: req.params.todoId,
    })

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Error deleting task:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.completedtodo = async (req, res) => {
  const completedTasks = await TodoModel.filter((task) => task.completed)
  res.json(completedTasks)
}
