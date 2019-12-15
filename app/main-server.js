// import React from 'react'
// import './app.less'
// import logo from './app.jpg'

const React = require('react')
require('./app.less')
const logo = require('./app.jpg')

class Hello extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      number: 3
    }
  }

  addNumber() {
    const { number } = this.state
    console.log(number)
    this.setState({
      number: number + 1
    })
  }

  render() {
    const { number } = this.state
    return (
      <div className="app">
        <span>app123</span>
        <h1>{number}</h1>
        <img src={logo} alt="logo show failed!" />
      </div>
    )
  }
}

module.exports = <Hello />
