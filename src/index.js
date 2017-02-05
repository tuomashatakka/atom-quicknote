'use babel'
import NoteView from './note-view'
import { CompositeDisposable } from 'atom'
const annimalNottes = {
  view: null,
  subscriptions: null,
  state: {},
  activate(state) {
    if (!this.view)
      this.make(state)
    this.state = state
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {'quicknote:toggle-status-bar-button': () => this.toggle()}))},
  make(state) {
    let { viewState } = state || {}
    this.view = new NoteView(viewState || [])
  },
  deactivate() {
    this.subscriptions.dispose()
    this.view.destroy()},
  serialize() {
    let { state } = this.view
    let viewState = {...state}
    return { viewState }},
  toggle() {}}
export default {...annimalNottes, consumeStatusBar(statusBar) {
  if (!annimalNottes.view)
    annimalNottes.make({})
    annimalNottes.view.attach(statusBar)},}
