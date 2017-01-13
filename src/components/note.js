import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
import Textarea from 'react-textarea-autosize';

class Note extends Component {

  constructor(props) {
    super(props);

    this.state = { editing: false };
    this.onDeletion = this.onDeletion.bind(this);
    this.onEditing = this.onEditing.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onDeletion(event) {
    this.props.onDelete(this.props.id);
  }

  onEditing(event) {
    if (this.state.editing) {
      this.setState({ editing: false });
    } else this.setState({ editing: true });
    // this.props.onUpdate(this.props.note.id, { text: this.state.text });
  }

  onInputChange(event) {
    // this.setState({text: event.target.value});
    this.props.onUpdate(this.props.id, { text: event.target.value });
  }

  onDrag(e, ui) {
    this.props.onUpdate(this.props.id, { x: ui.x, y: ui.y });
  }

  render() {
    if (!this.state.editing) {
      return (
        <Draggable
          handle=".note-mover"
          grid={[25, 25]}
          defaultPosition={{ x: this.props.note.x, y: this.props.note.y }}
          position={{ x: this.props.note.x, y: this.props.note.y }}
          onDrag={this.onDrag}
        >
          <div className="note" >
            <div className="title"> {this.props.note.title} </div>
            <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
            <div className="buttons">
              <button onClick={this.onDeletion}> Delete </button>
              <button onClick={this.onEditing}> Edit </button>
              <button className="note-mover"> Move </button>
            </div>
          </div>
        </Draggable>
      );
    } else {
      return (
        <Draggable
          handle=".note-mover"
          grid={[25, 25]}
          defaultPosition={{ x: this.props.note.x, y: this.props.note.y }}
          position={{ x: this.props.note.x, y: this.props.note.y }}
          onDrag={this.onDrag}
        >
          <div className="note">
            <div className="title"> {this.props.note.title} </div>
            <Textarea className="textbox" onChange={this.onInputChange} value={this.props.note.text} />
            <div className="buttons">
              <button onClick={this.onDeletion}> Delete </button>
              <button onClick={this.onEditing}> Done </button>
              <button className="note-mover"> Move </button>
            </div>
          </div>
        </Draggable>
      );
    }
  }
}

// <div className="textbox"> {this.props.note.text} </div>

export default Note;
