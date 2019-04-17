import React, { Component } from "react";
import Draggable from "react-draggable"; // Both at the same time
import { Resizable } from "react-resizable";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Draggable bounds="parent">
        <Resizable>
          <div
            id={this.props.note.id}
            className="sticky"
            style={{ backgroundColor: this.props.note.color }}
            onDoubleClick={(note) => this.props.handleClick(this.props.note)}
          >
            <h3>{this.props.note.title}</h3>
            <p>{this.props.note.content}</p>
          </div>
        </Resizable>
      </Draggable>
    );
  }
}

export default Note;
