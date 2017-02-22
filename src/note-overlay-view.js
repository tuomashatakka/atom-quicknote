'use babel'

import React, { Component } from 'react'
import { render } from 'react-dom'
import OverlayComponent from './components/Overlay'


export default class NoteOverlay {

  constructor (parent, items=[]) {
    this.reference = null
    let iter = document.querySelectorAll('note-overlay').entries()
    let state

    try { state = JSON.parse(localStorage.getItem('quicknotes') || "{}")}
    catch(e) { state = {}}

    let { done, value } = iter.next()

    if (done)
      this.element = document.createElement('note-overlay')
    while (!done) {
      let [key, el] = value
      if (!this.element) this.element = el
      else el.innerHTML = ''
      let advance = iter.next()
      done = advance.done
      value = advance.value
    }
    render(
      <OverlayComponent
        ref={ref => this.reference = this.reference || ref}
        manager={parent.update}
        open={state.open}
        items={state.items}
        />, this.element)
  }
}
