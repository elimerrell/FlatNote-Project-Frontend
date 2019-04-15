import React, { Component } from "react";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        className="sticky"
        onClick={() => this.props.handleClick(this.props.note)}
      >
        <h3>{this.props.note.title}</h3>
        <p>{this.props.note.content}</p>
      </div>
    );
  }
}

export default Note;
