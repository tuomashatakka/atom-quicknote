'use babel'

import React, { Component } from 'react'
import { render } from 'react-dom'
import NoteActionDisplay from './NoteActionDisplay'

export default class Note extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toggled: true,
      archived: false,
    }
    this.archive = () => this.setState({archived: true})
  }

  render () {
    let { toggled, archived } = this.state
    let className = 'list-item'
    if (archived)
      className = 'list-item archived'
      //onClick={e => remove(timestamp)}
    let { meta, value, timestamp, remove } = this.props
    let date = new Date(timestamp)
    return (
      <li className={className}>
        <span className='icon icon-file-text' />
        <main>{value}</main>
        <NoteActionDisplay note={this} />
      </li>
    )
  }
}
