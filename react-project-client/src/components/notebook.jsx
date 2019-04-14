import React, { Component } from "react";
import Note from "./note";
import Card from 'react-bulma-components/lib/components/card';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';

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
        <Card.Content>
          <Heading>{this.props.notebook.title}</Heading>
          <Content>{this.props.notebook.description}</Content>
        </Card.Content>
      </Card>
    );
  }
}

export default Notebook;
