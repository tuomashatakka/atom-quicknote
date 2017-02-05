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
    let { archive } = note
    return (
      <nav
        className={'note-actions'}>

        <a onClick={e => edit(timestamp)}>
          <span className='icon icomoon icomoon-quill' />
          Edit
        </a>

        <a onClick={e => atom.clipboard.write(value)}>
          <span className='icon ion ion-ios-copy-outline' />
          Copy to clipbrd
        </a>

        <a onClick={e => archive()}>
          <span className='icon ion ion-ios-filing-outline' />
          Archive
        </a>

        <a onClick={e => remove(timestamp)}>
          <span className='icon ion ion-ios-trash-outline' />
          Remove
        </a>

      </nav>
    )
  }
}
