const React = require('react')
const {getTasks} = require('../actions/taskboardAction')

const mapColumnData = taskName => taskName.map(
  task => {
    return (
      <tr key={task}>
        <td>{task}</td>
      </tr>
    )
  }
)

const Tasks = (props) => {
  const tasks = props.tasks
  console.log(props.tasks)
  return (
    <div>
      <table>

        <thead>
          <tr>
            <th>
              {props.head}
              <div className='addTask'>
                <input />
                <button className='button' >Add me</button>
              </div>
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

class Taskboard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tasks: {}
    }
  }

  componentDidMount () {
    getTasks
      .then(res => {
        const tasks = res.data
        this.setState(tasks)
      })
      .catch(err => { console.error(err) })
  }

  render () {
    const tasks = this.state.tasks
    const taskHeads = Object.keys(tasks)
    return taskHeads.length === 0 ? (<p> loading </p>) : (
      <div className='tableContainer'>
        {taskHeads.map((head) => {
          console.log(tasks + 'in lanldn')
          return <Tasks key={head} head={head} tasks={this.state.tasks[head]} />
        })}
      </div>
    )
  }
}

module.exports = Taskboard
