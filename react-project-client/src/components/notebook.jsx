import React, { Component } from "react";
import Note from "./note";
import { Card, CardContent, Title, Subtitle} from 'reactbulma'

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
      <Card>
        <CardContent>
          <Title>{this.props.notebook.title}</Title>
          <Subtitle>{this.props.notebook.description}</Subtitle>
        </CardContent>
      </Card>
    );
  }
}

export default Notebook;
