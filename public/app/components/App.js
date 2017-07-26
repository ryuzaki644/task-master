const React = require('react')
const ReactRouter = require('react-router-dom')
const Router = ReactRouter.BrowserRouter
const Route = ReactRouter.Route
const Switch = ReactRouter.Switch
const Taskboards = require('./Taskboards')
const Taskboard = require('./Taskboard')

class App extends React.Component {
  render () {
    return (
      <Router >
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Taskboards} />
            <Route path='/board' component={Taskboard} />
          </Switch>

        </div>
      </Router>
    )
  }
}

module.exports = App
