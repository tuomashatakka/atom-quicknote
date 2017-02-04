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
      count: 0,
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
    let count = this.state.items.length || 0
    state.count = count

    this.setState(state)
    this.updateHost(state)
  }

  onToggle () {
    let { open } = this.state
    this.updateState({ open: !open })
    console.log("togglin' handlin' endin'", open)
  }

  componentDidMount () {
    this.editor
        .getModel()
        .onDidStopChanging(this.onChange)
    this.editor.addEventListener('keydown', e => {
      let { ctrlKey, shiftKey, altKey, metaKey, keyCode } = e
      if (keyCode !== 13 ||
          ctrlKey ||
          shiftKey ||
          altKey ||
          metaKey)
          return false
      return this.onSubmit(e)
    })
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
    items = items.filter(item => item.timestamp !== hash)
    this.updateState({ items })
  }

  render() {

    let { open, items, count } = this.state
    let item = o => <Note key={o.timestamp} remove={this.onDelete} {...o} />

    // TODO: Change to ES6 import syntax
    const resolve = require('path').resolve
    const packagePath = atom.packages.getLoadedPackage('quicknote').path
    const path = 'resources/trinitynote-vector.svg'
    const iconPath = resolve(`${packagePath}/${path}`)

    return (
      <div className={open ? 'open' : 'closed'}>

        <div
          className={"qn-label" + (open ? ' selected active' : ' closed')}
          onClick={() => this.onToggle()}>

          <div className='qn-icon'>
            <svg viewBox="0 0 128 128"><use xlinkHref={iconPath + '#note-icon'} /></svg></div>
          <output className='qn-counter badge'>
            {count}</output>
          <span className='qn-toggle-text'>
              Notes</span>

      </div>

        <article className={open ? 'visible' : 'hidden'}>

          <ul className='list-group'>
             {items.map(item)}</ul>

          <atom-text-editor
            auto-height={true}
            autoHeight={true}
            mini ref={editor =>
           this.editor = this.editor || editor} />

          <button className='btn' onClick={this.onSubmit}>
            <span className='icon icon-plus' /></button>

        </article>
      </div>
    )
  }
}


export default class NoteOverlay {

  constructor (parent, items=[]) {
    let iter = document.querySelectorAll('note-overlay').entries()
    let { done, value } = iter.next()
    if (done)
      this.element = document.createElement('note-overlay')

    while (!done) {
      let [key, el] = value

      if (!this.element)
        this.element = el
      else
        el.innerHTML = ''
      let advance = iter.next()
      done = advance.done
      value = advance.value
    }

    render(<OverlayComponent manager={parent.update} items={items} />, this.element)
  }
}
