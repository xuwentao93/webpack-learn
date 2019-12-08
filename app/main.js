import React from 'react'
// import Test from './test.jsx'
import ReactDOM from 'react-dom'

class Learn extends React.Component {
  render() {
    return <div>hello react</div>
    
  }
}

ReactDOM.render(
  <Learn />,
  document.querySelector('#root')
)

// console.log(Test)