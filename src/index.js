'use babel'

import NoteView from './note-view'
import { CompositeDisposable } from 'atom'


const pak = {
  subscriptions: null,
  view: null,
  state: {},

  activate(state) {

    this.state = this.deserialize(state)
    this.renderView()
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add(
    'atom-workspace', {
      'quicknote:toggle-status-bar-button': () => this.toggle(),
      'quicknote:purge': () => this.purge(),
      'quicknote:restore-archived': () => this.restoreArchivedNotes(),
    }))
  },

  renderView () {
    let viewState = this.getSavedState('viewState')
    let update = (data) => this.setViewState(data)
    this.view = this.view || new NoteView(viewState, update)
    this.toggle = this.view.toggle()
    return this.view
  },

  getSavedState (key=null) {
    let savedData
    try { savedData = JSON.parse(localStorage.getItem( 'quicknotes' ) || "{}") }
    catch (e) { savedData = {} }
    return key ? savedData[key] : savedData
  },

  setViewState (contents) {
    let viewState = this.state ? this.state.viewState : {}
    this.state = { ...this.state, viewState: { ...viewState, ...contents }}
    let dump = this.serialize()
    localStorage.setItem('quicknotes', dump)
    let result = localStorage.getItem('quicknotes')
  },

  restoreArchivedNotes () {
    let { viewState } = this.state
    let items = []
    if (viewState)
      items = (viewState.items || []).map(item => ({ ...item, archived: false }))
      this.state.viewState.items = items
    return this.state.viewState.items
  },

  purge () {
    localStorage.setItem('quicknotes', '')
    this.state = { }
  },

  serialize () {
    return JSON.stringify(this.state)
  },

  deserialize (state) {
    let savedData = this.getSavedState()
    let providedData = (typeof state === 'string' ? JSON.parse(state) : state)
    this.state = { ...providedData, ...savedData }
    return this.state
  },

  deactivate () {
    let { subscriptions, view } = this
    view.destroy()/*er _ 69 */
    subscriptions.dispose()
  }

}

export default {
  ...pak,
  consumeStatusBar(statusBar) {
    let { view } = pak
    if (!view) view = pak.renderView()
    view.attach(statusBar)
}}
