'use babel'

import React, { Component } from 'react'
import { render } from 'react-dom'


class Note extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toggled: true,
      archived: false,
    }
  }

  render () {
    let { toggled, archived } = this.state
    if (archived)
      return null

    let { meta, value, timestamp, remove } = this.props
    let date = new Date(timestamp)
    return (
      <li onClick={e => remove(timestamp)} className='list-item'>
        <span className='icon icon-file-text' />
        <time>{date.toLocaleString()}</time>
        <main>{value}</main>
      </li>
    )
  }
}

class OverlayComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: true,
      value: '',
      items: props.items || []}
    this.editor       = null
    this.updateHost   = this.props.manager
    this.onToggle     = this.onToggle.bind(this)
    this.onChange     = this.onChange.bind(this)
    this.onSubmit     = this.onSubmit.bind(this)
    this.onDelete     = this.onDelete.bind(this)
    this.updateState  = this.updateState.bind(this)
  }

  updateState (state) {
    this.setState(state)
    this.updateHost(state)
  }

  onToggle () {
    this.updateState({ open: !this.state.open })
  }

  componentDidMount () {
    this.editor
        .getModel()
        .onDidStopChanging(this.onChange)
  }

  onChange (event) {
    let value = this.editor.getModel().getText()
    this.updateState({ value })
    return this.updateHandler &&
           this.updateHandler({value, event})
  }

  onSubmit (event) {
    let { items } = this.state
    let value = this.editor.getModel().getText()
    let item  = {
      timestamp: Date.now(),
      value,
      meta: { priority: 0, }}

    this.editor.getModel().setText('')
    this.updateState({ value: '', items: [...items, item] })
    return this.submitHandler &&
           this.submitHandler({value, event})
  }

  onDelete (hash) {
    let { items } = this.state
    console.log([...items])
    items = items.filter(item => item.timestamp !== hash)
    this.updateState({ items })
  }

  render() {
    let { open, items } = this.state
    let item = o => <Note key={o.timestamp} remove={this.onDelete} {...o} />
    return (
      <div>

        <span
          className="notetoggle label"
          onClick={this.onToggle}>
          Notes
        </span>

        <article className={open ? 'visible' : 'hidden'}>

          <ul className='list-group'>
            {items.map(item)}
          </ul>

          <atom-text-editor mini ref={editor => this.editor = this.editor || editor} />

        <button className='btn' onClick={this.onSubmit}>
          <span className='icon icon-plus' />
        </button>

        </article>
      </div>
    )
  }
}


export default class NoteOverlay {

  constructor (parent, items=[]) {
    this.element = document.createElement('note-overlay')
    render(<OverlayComponent manager={parent.update} items={items} />, this.element)
  }
}
