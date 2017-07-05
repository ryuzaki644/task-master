const fs = require('fs')
const path = require('path')

const todoController = (req, res) => {
  const todos = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/todos.json'), 'utf8'))
  res.send(todos)
}

module.exports = todoController
