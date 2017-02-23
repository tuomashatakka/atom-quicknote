'use babel'

import React, { Component } from 'react'
import { render } from 'react-dom'
import NoteActionDisplay from './NoteActionDisplay'

export default class Note extends Component {

  constructor(props) {
    super(props)
    this.meta = props.meta || {}
    this.state = {
      toggled: true,
      archived: this.meta.archived || false,
      priority: this.meta.priority || 0,
    }
    this.archive = this.archive.bind(this)
  }

  archive (unarchive=false) {
    let update = { archived: !unarchive }
    let { timestamp } = this.props
    this.setState(update)
    this.meta = { ...this.meta, ...update }
    this.props.updateMeta(timestamp, this.meta)
  }

  render () {
    let { toggled, archived } = this.state
    let className = 'list-item'
    if (archived)
      className = 'list-item archived'
      //onClick={e => remove(timestamp)}
    let { value, timestamp, remove } = this.props
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
