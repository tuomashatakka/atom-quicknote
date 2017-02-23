'use babel'

import React, { Component } from 'react'
import { render } from 'react-dom'


export default class NoteActionDisplay extends Component {

  constructor(props) {
    super(props)
    this.state = {
      note: props.note ||{},
    }
  }

  render () {
    let { note } = this.state
    if (!note)
    return null
    let { remove, timestamp, value, edit } = note.props
    let { priority, archived } = note.state
    let { archive } = note
    let date = new Date(timestamp)
    return (

      <nav className={'note-actions toolbar'}>

        <time>{date.toLocaleString()}</time>

        <a onClick={e => archive(archived)}>
          <span className={'icon ion ion-ios-' + (archived ? `checkmark-outline` : `checkmark`)} />
          {archived?'Mark und':'D'}one </a>

        <a onClick={e => edit(timestamp)}>
          <span className='icon icomoon icomoon-quill' />
          Modify </a>

        <a onClick={e => atom.clipboard.write(value)}>
          <span className='icon ion ion-ios-copy-outline' />
          Copy </a>

        <a onClick={e => remove(timestamp)}>
          <span className='icon ion ion-ios-trash-outline' />
          Delete </a>

      </nav>
    )
  }
}
