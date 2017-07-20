const React = require('react')
const {fetchTodos, postTodos} = require('../actions/TodosAction.js')

class AddTodo extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      todo: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    const value = event.target.value
    this.setState(() => {
      return {
        todo: value
      }
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.onSubmit(this.state.todo)
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.todo} onChange={this.handleChange} />
          <button className='button' onSubmit={this.handleSubmit} >
              Add task Board
            </button>
        </form>
      </div>
    )
  }
}

class ListTodos extends React.Component {

  render () {
    const todos = this.props.todos
    return (
      <div>
        <ul>
          {todos.length === 0 ? 'loading' : todos.map(todo => {
            return <li key={todo.id}>{todo.todo}</li>
          })
        }
        </ul>
      </div>
    )
  }
}

class Todos extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      todos: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    fetchTodos.then(res => {
      this.setState(() => {
        return {todos: res}
      })
    })
  }

  handleSubmit (todo) {
    const todoObject = {
      id: this.state.todos.length + 1,
      todo: todo,
      completed: false
    }
    this.setState(() => {
      return {
        todos: this.state.todos.concat([todoObject])
      }
    })
    postTodos(todoObject).then(todos => todos)
  }

  render () {
    return (
      <div>
        <AddTodo onSubmit={this.handleSubmit} />
        <ListTodos todos={this.state.todos} />
      </div>
    )
  }
}

module.exports = Todos
