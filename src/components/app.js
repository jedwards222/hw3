import React, { Component } from 'react';
import TextBar from './text_bar';
import Immutable from 'immutable';
import Note from './note.js';

// import Welcome from './welcome';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map(),
      selectedNote: null,
      currentid: 0,
    };

    this.getNotes = this.getNotes.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    // this.createNote = this.createNote.bind(this);
  }

  getNotes() {
    return (
      this.state.notes.entrySeq().map(([id, note]) => {
        return (
          <Note id={id} note={note} key={id}
            onDelete={this.deleteNote}
            onUpdate={this.updateNote}
          />
        );
      })
    );
  }

  createNote(title) {
    const newid = this.state.currentid + 1;
    // Create a note with the current ID and given title
    this.setState({
      currentid: newid,
      notes: this.state.notes.set(newid, {
        title,
        text: 'default text',
        x: 0,
        y: 0,
        zIndex: 0,
      }),
    });
    return;
  }

  updateNote(id, fields) {
    this.setState({
      notes: this.state.notes.update(id, (note) => { return Object.assign({}, note, fields); }),
    });
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  render() {
    return (
      <div>
        <TextBar onCreate={text => this.createNote(text)} />
          {this.getNotes()}
      </div>
    );
  }
}

export default App;
