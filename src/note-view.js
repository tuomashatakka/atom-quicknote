'use babel'
import Overlay from './note-overlay-view'


export default class OverlayView {

  constructor(serializedState={}) {
    // Create root element
    this.visible = false
    this.element = new Overlay(this, serializedState.items)
    this.state = serializedState
  }

  attach (statusBar) {
    let args = {
      item: this.element,
      priority: 5,
    }
    this.toggle = statusBar.addLeftTile(args)
  }

  update (state) {
    this.state = {
      ...this.state,
      ...state,
    }
    console.log(this.state)
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    console.log(this.state)
    return this.state
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove()
  }

  getElement() {
    return this.element;
  }

}
