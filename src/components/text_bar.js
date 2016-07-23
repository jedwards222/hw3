import React, { Component } from 'react';

class TextBar extends Component {

  constructor(props) {
    super(props);

    this.state = { textterm: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onCreation = this.onCreation.bind(this);
  }

  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ textterm: event.target.value });
    // this.props.onTextChange(this.state.textterm);
  }

  onCreation(event) {
    this.props.onCreate(this.state.textterm);
    this.setState({ textterm: '' });
  }

  render() {
    return (
      <div>
        <input onChange={this.onInputChange} value={this.state.textterm} />
        <button onClick={this.onCreation} >
          Create New Note
        </button>
      </div>
    );
  }
}

export default TextBar;
