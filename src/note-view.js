'use babel'
import Overlay from './note-overlay-view'
export default class OverlayView {
  constructor(serializedState={}) {
    this.visible = false
    this.element = new Overlay(this, serializedState.items)
    this.state = serializedState}
  attach (statusBar) {
    let args = {
      item: this.element,
      priority: 5,}
    this.toggle = statusBar.addLeftTile(args)}
  update (state) {
    this.state = {...this.state,...state,}}
  serialize() {
    let { state } = this
    return {...state}}
  destroy() {this.element.remove()}
  getElement() {return this.element}}
