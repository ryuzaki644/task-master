const React = require('react')
const fetchTodos = require('../actions/fetchTodos')

class Todos extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      todos: []
    }
  }
  componentDidMount () {
    fetchTodos().then(res => {
      this.setState(function () {
        return {todos: res}
      })
    })
  }

  render () {
    let todoList = this.state.todos
    return <div>
      {this.state.todos.length === 0 ? 'loading' : todoList.map(todo => {
        return <p
          key={todo.todo}> {todo.todo} </p>
      })}
    </div>
  }
}

module.exports = Todos
