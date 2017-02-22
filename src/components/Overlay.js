'use babel'

import React, { Component } from 'react'
import { render } from 'react-dom'
import Note from './Note'
import { resolve } from 'path'


export default class OverlayComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: true, //props.open || false,
      value: '',
      count: 0,
      items: props.items || []}
    this.editor       = null
    this.updateHost   = s => this.props.manager(s)
    this.onToggle     = this.onToggle.bind(this)
    this.onChange     = this.onChange.bind(this)
    this.onSubmit     = this.onSubmit.bind(this)
    this.onDelete     = this.onDelete.bind(this)
    this.onRestore    = this.onRestore.bind(this)
    this.updateState  = this.updateState.bind(this)
  }

  updateState (state) {
    let count = this.state.items.length || 0
    state.count = count

    this.setState(state)
    this.updateHost(this.state)
  }

  onToggle (toggle) {
    let { open } = this.state || toggle
    this.updateState({ open: !open })
    console.log("togglin' handlin' endin'", open)
    return this.state.open
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

  onRestore (hash) {
    let { items } = this.state
    let note = items.find(item => item.timestamp === hash)
    let value = this.editor.getModel().setText(note.value)

    // TODO: Replace with a more sensible approach
    this.onDelete(hash)
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
    let item = o => <Note
                      key={o.timestamp}
                      edit={this.onRestore}
                      remove={this.onDelete}
                      {...o} />

    // TODO: Change to ES6 import syntax
    const package = atom.packages.getLoadedPackage('quicknote')
    if (!package)
      return null
    const {path} = package
    const localPath = 'resources/trinitynote-vector.svg'
    const iconPath = (path) ? resolve(`${path}/${localPath}`) : ''

    return (
      <div className={open ? 'open' : 'closed'}>

        <div onClick={() => this.onToggle()}
             className={"qn-label" + (open ? ' selected active' : ' closed')} >

          <div className='qn-icon'>
            <svg viewBox="0 0 128 128"><use xlinkHref={iconPath + '#note-icon'} /></svg></div>

          <span className='qn-toggle-text'>
              Notes</span>

          <output className='qn-counter badge'>
            {count}</output>

        </div>
        <article className={open ? 'visible' : 'hidden'}>

          <ul className='list-group'>
             {items.map(item)}</ul>

          <atom-text-editor mini ref={editor => this.editor = this.editor || editor} />

          <button className='btn' onClick={this.onSubmit}>
            <span className='icon icon-plus' /></button>

        </article>
      </div>
    )
  }
}
