import React, { Component } from "react";
import Note from "./note";
import Container from "react-bulma-components/lib/components/container";
import Tile from "react-bulma-components/lib/components/tile";
import Section from "react-bulma-components/lib/components/section";
import Box from "react-bulma-components/lib/components/box";
import Heading from "react-bulma-components/lib/components/heading";
import Image from "react-bulma-components/lib/components/image";

class Notebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
    this.getNotes();
  }

  getNotes = () => {
    const {
      match: { params }
    } = this.props;
    fetch(`http://localhost:3000/api/v1/notebooks/${params.notebookId}/notes`)
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
      <Container>
        <Section>
          <Box>{this.mapNotes()}</Box>
        </Section>
      </Container>
    );
  }
}

export default Notebook;
