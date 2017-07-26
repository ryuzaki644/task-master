const React = require('react')
const {getTasks} = require('../actions/taskboardAction')
const parseQuery = require('query-string').parse

const mapColumnData = taskName => taskName.map(
  task => {
    return (
      <tr key={task}>
        <td>{task}</td>
      </tr>
    )
  }
)

class AddTaskHead extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      taskHead: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputSubmit = this.handleInputSubmit.bind(this)
  }

  handleInputChange (event) {
    event.preventDefault()
    this.setState({'taskHead': event.target.value})
  }

  handleInputSubmit (event) {
    event.preventDefault()
    const taskTable = {taskHead: this.state.taskHead, taskContent: []}
    this.props.addTaskHead(taskTable)
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleInputSubmit}>
          <div className='addForm'>
            <input type='text' onChange={this.handleInputChange} value={this.state.taskHead} />
            <button className='button' type='submit' >Add Column</button>
          </div>
        </form>
      </div>
    )
  }
}

class Tasks extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      task: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    const value = event.target.value
    this.setState({task: value})
  }

  handleSubmit (event) {
    event.preventDefault()
    const head = this.props.head
    const taskContent = this.props.tasks.concat(this.state.task)
    this.props.onSubmit(head, taskContent)
  }

  render () {
    const tasks = this.props.tasks
    return (
      <div className='taskTable'>
        <table>
          <thead>
            <tr>
              <th>
                {this.props.head}
                <form onSubmit={this.handleSubmit}>
                  <div className='addForm'>
                    <input value={this.state.todo} onChange={this.handleChange} />
                    <button type='submit' className='button' >Add me</button>
                  </div>
                </form>
              </th>
            </tr>
          </thead>

          <tbody>
            {mapColumnData(tasks)}
          </tbody>

        </table>
      </div>
    )
  }
}

class Taskboard extends React.Component {
  constructor (props) {
    super(props)

    const [boardId] = Object.keys(parseQuery(this.props.location.search))

    this.state = {
      id: boardId
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.addTaskHead = this.addTaskHead.bind(this)
  }

  componentDidMount () {
    getTasks(this.state.id)
      .then(res => {
        console.log(res)
        const tasks = res.data
        this.setState(tasks)
      })
      .catch(err => { console.error(err) })
  }

  addTaskHead (taskTable) {
    this.setState({taskTables: this.state.taskTables.concat(taskTable)})
  }

  onSubmit (taskHead, taskContent) {
    const taskTables = this.state.taskTables.map(task => {
      if (task.taskHead === taskHead) {
        return {
          taskHead, taskContent
        }
      }
      return task
    })
    this.setState({taskTables})
  }

  render () {
    const taskTables = this.state.taskTables
    return (
      <div>
        <h1>{this.state.board}</h1>
        <div className='addTaskHead'>
          <AddTaskHead addTaskHead={this.addTaskHead} />
          {taskTables !== undefined && taskTables.length === 0 && <h1>Add taskHead</h1>}
        </div>
        <div className='tables'>
          <div className='tableContainer'>
            {taskTables !== undefined && taskTables.map(table => {
              const taskHead = table.taskHead
              return <Tasks key={taskHead} head={taskHead} tasks={table.taskContent} onSubmit={this.onSubmit} />
            })}
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Taskboard
