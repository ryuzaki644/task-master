const todos = require('../controllers/todoController')

const todoRoute = router => {
  router
    .route('/todos')
    .get(todos)
}

module.exports = todoRoute
