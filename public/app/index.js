const React = require('react')
const ReactDOM = require('react-dom')
require('./index.css')

const App = require('./components/App.js')

ReactDOM.render(<App name='sara' />, document.getElementById('app'))
