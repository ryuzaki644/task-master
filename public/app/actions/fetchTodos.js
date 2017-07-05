const axios = require('axios')

const fetchTodos = () => axios
  .get(`http://localhost:3000/api/v1/todos`)
  .then(res => res.data)
  .catch(err => {
    console.log(err + 'request failed')
  })

module.exports = fetchTodos
