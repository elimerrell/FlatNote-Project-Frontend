import React, { Component } from "react";
import Note from "./note";

const NOTES = "http://localhost:3000/api/v1/notebooks/1/notes";
class Notebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      mappedNotes: []
    };
    this.getNotes();
  }

  getNotes = () => {
    fetch(NOTES)
      .then(resp => resp.json())
      .then(notes =>
        this.setState({
          notes
        })
      );
  };

  mapNotes = () => {
    return this.state.notes.map(note => <Note note={note} />);
  };

  render() {
    return (
      <div>
        <h3> {this.props.notebook.title}</h3>
        <p>{this.props.notebook.description}</p>
        {this.mapNotes()}
      </div>
    );
  }
}

export default Notebook;
