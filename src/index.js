'use babel'
import NoteView from './note-view'
import { CompositeDisposable } from 'atom'
const annimalNottes = {
  view: null,
  subscriptions: null,
  state: {},
  activate(state) {
    if (!this.view) {
    this.state = state
    let { viewState } = state || {}
    this.view = new NoteView(viewState || [])
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {'quicknote:toggle-status-bar-button': () => this.toggle()}))}},
  deactivate() {
    this.subscriptions.dispose()
    this.view.destroy()},
  serialize() {
    let { state } = this.view
    let viewState = {...state}
    return { viewState }},
  toggle() {}}
annimalNottes.activate()
export default {...annimalNottes, consumeStatusBar(statusBar) {
    annimalNottes.view.attach(statusBar)},}
