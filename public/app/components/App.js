const React = require('react')
const ReactRouter = require('react-router-dom')
const Router = ReactRouter.BrowserRouter
const Route = ReactRouter.Route
const Todos = require('./Todos')

class App extends React.Component {
  render () {
    return (
      <Router >
        <div className='container'>
            <Route exact path='/' component={Todos} />
        </div>
      </Router>
    )
  }
}



module.exports = App
