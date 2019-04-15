import React, { Component } from "react";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Draggable>
        <div
          id={this.props.note.id}
          className="sticky"
          onDoubleClick={() => this.props.handleClick(this.props.note)}
        >
          <h3>{this.props.note.title}</h3>
          <p>{this.props.note.content}</p>
        </div>
      </Draggable>
    );
  }
}

export default Note;
