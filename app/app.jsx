import React from 'react'
import './app.less'
import logo from './app.jpg'

export default class extends React.Component {
  render() {
    return (
      <div className='app'>
        <span>app123</span>
        <img src={ logo } alt=""/>
      </div>
    )
  }
}
