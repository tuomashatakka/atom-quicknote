'use babel'
import Overlay from './note-overlay-view'
export default class OverlayView {
  constructor(serializedState={}) {
    this.visible = false
    this.update =this.update.bind(this)
    let stored = JSON.parse(localStorage.getItem('quicknotes'))
    this.state = {...serializedState, ...stored}
    this.element = new Overlay(this, this.state.items)}
  attach (statusBar) {
    let args = {
      item: this.element,
      priority: 5,}
    this.toggle = statusBar.addLeftTile(args)}
  update (state) {
    if (!this.state)
      this.state = state
    else
      this.state = {...this.state,...state,}
    console.log(this, state, this.state);
    localStorage.setItem('quicknotes', JSON.stringify(this.state))}
  serialize() {
    let { state } = this
    console.log(state);
    return {...state}}
  destroy() {this.element.remove()}
  getElement() {return this.element}}
