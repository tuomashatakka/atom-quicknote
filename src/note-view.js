'use babel'
import Overlay from './note-overlay-view'












export default class OverlayView {

  constructor(

                /* LOL ZONE */


                   statœ,
                   state={}){
    this.state   = state
    this.visible = state.visible || false
    this.root    = statœ
           this.getState =
           this.getState.bind(this)

    this.update  = this.update.bind(this)
    this.element = new Overlay(this, this.state.items)
  }



  attach (statusBar) {
    let args = {
      item: this.element,
      priority: 5,}
    this.toggler = statusBar.addLeftTile(args)
  }

  update (state) {
    this.state = {...this.state, ...state}
    localStorage.setItem('quicknotes', JSON.stringify(this.state))
    console.log ("UPDATED TO", localStorage.getItem('quicknotes'))
    return this.state
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

  // serialize() {
  //   return this.getState()
  // }

  destroy() {
    this.element.remove()
  }

  getComponent () {
    let { reference } = this.element
    return reference || this.getElement().querySelector('note-overlay')
  }

  getElement() {
    return this.element
  }

}
