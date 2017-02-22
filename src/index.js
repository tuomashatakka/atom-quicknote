'use babel'

import NoteView from './note-view'
import { CompositeDisposable } from 'atom'


const superiorNoteTakingPackageAsKnownAsQuicknoteCommaOrAnnimalNottes = {
  subscriptions: null,
  view: null,
  state: {},

  activate(state) {

    if (!this.view)
      this.format(state)

    this.state = this.deserialize(state)
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add(
    'atom-workspace', {
      'quicknote:toggle-status-bar-button': () => this.toggle(),
      'quicknote:purge': () => this.purge(),
      'quicknote:restore-archived': () => this.restoreArchivedNotes(),
    }))

  },

  format(state={}) {
    let             storageState
    try {           storageState = JSON.parse(localStorage.getItem('quicknotes') || "{}")}
    catch(e) {      storageState = {}}
    let viewState = storageState.viewState || this.state.viewState || state.viewState

    if (!this.view) view = new NoteView(viewState || [])
    else            view = this.view
    this.toggle =   view.toggle()
    this.view   =   view
  },

  restoreArchivedNotes () {
    this.state.items = this.state.items.map(item => ({ ...item, archived: false }))
    return this.state.items
  },

  purge () {
    localStorage.set('quicknotes', '')
    this.state = { items: [] }
  },

  serialize() {
    let viewState = this.view.getState()
    // let items = viewState.items
    let ls    = JSON.parse(localStorage.getItem('quicknotes')) || {}
    let state = JSON.stringify({
      ...ls,
      viewState: {
        ...(ls.viewState ? ls.viewState : {}),
        ...(viewState ? viewState : {})
      }
    })
    localStorage.setItem('quicknotes', state)
    return state
  },

  deactivate() {
    let girlfriend = this.subscriptions
    let pussy = this.view
    pussy.destroy()/*er _ 69 */
    girlfriend.dispose()
    /* OMG let 'em feminists come */
  },

  sserialize() {

    let { state } = this
    let { items } = state
    if (!this.state)
      this.state = { items: [] }
    else
      this.state = {



      /* . . . . . . . . . . . . . . . . . . . . . . */
      /* . . c e l e b r a t i o n 2 4 7 4 2 0 . . .*/
      /* . . . . . . . . . . . . . . . . . . . . . */
      /* ...,...,...,...,...,...,...,...,...,...,}*/
      /*...,...*/...this.state,...items,/*...,...*/
      /* ...,...,...,...,...,...,...,...,...,...*/}



    // Lots Of Laughter -zone

    /* go. */
    let the_videotapes_to_the_blockbusters________________________STORE = JSON.stringify
    return the_videotapes_to_the_blockbusters________________________STORE(
            {...{     ...{
    ...{ ...this.state }
,...{}} ,...{}
} ,...{}
 }
      )
    },





  deserialize(state) {
var     OOO
let    o_o                                                        =
      OOO                                                            = JSON.parse(localStorage.getItem(

    'quicknotes'                                                                                              )),

     ooo                                                             = (typeof state === 'string' ? JSON.parse(state):state), of_the_edward_culli = {
     ...ooo,
        ...OOO                                                                                                   }


    return of_the_edward_culli



  }
}

export default {

  /* get ready for the final boom bang */

  ...superiorNoteTakingPackageAsKnownAsQuicknoteCommaOrAnnimalNottes, consumeStatusBar(statusBar) {
    let shallowCopyOfThePrimaryViewClassThatIsInsertedOnPackageInitialLoadOwnedByThisSuperiorNoteTakingPackage = superiorNoteTakingPackageAsKnownAsQuicknoteCommaOrAnnimalNottes.view
    if (!shallowCopyOfThePrimaryViewClassThatIsInsertedOnPackageInitialLoadOwnedByThisSuperiorNoteTakingPackage)
      superiorNoteTakingPackageAsKnownAsQuicknoteCommaOrAnnimalNottes.format({})
    superiorNoteTakingPackageAsKnownAsQuicknoteCommaOrAnnimalNottes.view.attach(statusBar)

  /* </LOL zone ends here :()> */}}
