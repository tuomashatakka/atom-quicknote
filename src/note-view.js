'use babel'
import React from 'react'
import Overlay from './note-overlay-view'
import OverlayComponent from './components/Overlay'
import { render } from 'react-dom'


export default class OverlayView {

  constructor(state={}, updater=()=>null) {
    this.state    = state
    this.update   = updater
    this.visible  = state.visible || false
    this.getState = this.getState.bind(this)
    this.element  = this.getElement() // new Overlay(this, this.state.items || [])
  }

  attach (statusBar) {
    let args = {
      item: this.element,
      priority: 5,
    }
    this.toggler = statusBar.addRightTile(args)
  }

  getState () {
    return this.getComponent().state
  }

  isVisible () {
    return this.visible
  }

  toggle () {
    this.visible = this.getComponent().onToggle()
  }

  destroy() {
    this.element.remove()
  }

  getComponent () {
    let { reference } = this
    return reference || this.getElement().querySelector('note-overlay')
  }

  getElement() {
    this.element = this.element || document.querySelector('note-overlay') || document.createElement('note-overlay')
    this.element.setAttribute('class', 'inline-block')
    if (!this.reference)
      render(
        <OverlayComponent
        ref={ref => this.reference = this.reference || ref}
        manager={this.update}
        open={this.state.open || false}
        items={this.state.items || []}
        />,
        this.element)
      return this.element
    }

  }
