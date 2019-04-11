import React, { Component } from "react";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h3>Title: {this.props.note.title}</h3>
        <p>Content: {this.props.note.content}</p>
      </div>
    );
  }
}

export default Note;
