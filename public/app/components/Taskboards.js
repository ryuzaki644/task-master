const React = require('react')
const Link = require('react-router-dom').Link
const {fetchTodos, postTodos} = require('../actions/TodosAction.js')

class AddBoard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      board: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    const value = event.target.value
    this.setState(() => {
      return {
        board: value
      }
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.onSubmit(this.state.board)
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.board} onChange={this.handleChange} />
          <button className='button' onSubmit={this.handleSubmit} >
              Add task Board
            </button>
        </form>
      </div>
    )
  }
}

class ListBoards extends React.Component {

  render () {
    const boards = this.props.boards
    const match = this.props.match
    return (
      <div className='boards'>
        {boards.length === 0 ? 'loading' : boards.map(board => {
          console.log(board)
          return (
            <div className='boardName' key={board.id}>
              <Link className='tasks' to={{
                pathname: match.url + `board`,
                search: `${board.id}`
              }}
               >
                {board.board}
              </Link>
            </div>
          )
        })
      }
      </div>
    )
  }
}

class Taskboards extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      boards: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    fetchTodos.then(res => {
      this.setState(() => {
        return {boards: res}
      })
    })
  }

  handleSubmit (board) {
    const newBoard = {
      id: this.state.boards.length + 1,
      board: board,
      completed: false,
      taskTables: []
    }
    this.setState(() => {
      return {
        boards: this.state.boards.concat([newBoard])
      }
    })
    postTodos(newBoard).then(todos => todos)
  }

  render () {
    return (
      <div>
        <AddBoard onSubmit={this.handleSubmit} />
        <ListBoards boards={this.state.boards} match={this.props.match} />
      </div>
    )
  }
}

module.exports = Taskboards
