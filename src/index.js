'use babel';

import NoteView from './note-view';
import { CompositeDisposable } from 'atom';

export default {

  view: null,
  subscriptions: null,
  state: {},

  activate(state) {

    this.state = state
    console.log("Loaded quicnote with state", state);
    this.view = new NoteView(this.state.viewState)
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'quicknote:toggle-status-bar-button': () => this.toggle()
    }));
  },

  consumeStatusBar(statusBar) {
    this.view.attach(statusBar)
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.asdView.destroy();
  },

  serialize() {
    console.log("Serializing view ->", this.view.serialize());
    return {
      viewState: this.view.state
    }
  },

  toggle() {
    return
  }

}
