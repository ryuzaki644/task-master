const React = require('react')
const ReactRouter = require('react-router-dom')
const Router = ReactRouter.BrowserRouter
const Route = ReactRouter.Route
const browserHistory = ReactRouter.browserHistory
const Switch = ReactRouter.Switch
const Todos = require('./Todos')
const Taskboard = require('./Taskboard')

class App extends React.Component {
  render () {
    return (
      <Router history={browserHistory} >
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Todos} />
            <Route exact path='/board' component={Taskboard} />
          </Switch>

        </div>
      </Router>
    )
  }
}

module.exports = App
