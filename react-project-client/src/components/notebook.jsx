import React, { Component } from "react";
import PropTypes from "prop-types";
import Note from "./note";
import Container from "react-bulma-components/lib/components/container";

import Section from "react-bulma-components/lib/components/section";
import Box from "react-bulma-components/lib/components/box";
import Button from "react-bulma-components/lib/components/button";
import Modal from "react-bulma-components/lib/components/modal";

class Notebook extends Component {
  static propTypes = {
    modal: PropTypes.object
  };

  static defaultProps = {
    modal: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      currentNote: {},
      show: false
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

  open = () => this.setState({ show: true });
  close = () => this.setState({ show: false });

  handleClick = note => {
    this.open();
    this.setState({
      currentNote: note
    });
    console.log(this.state.currentNote);
  };

  mapNotes = () => {
    return this.state.notes.map(note => (
      <Note note={note} handleClick={this.handleClick} />
    ));
  };

  handleChange = () => {};

  openModal = () => {
    return (
      <Container>
        <div className="modal-box">
          <Box>
            <input
              name="title"
              value={this.state.currentNote.title}
              onChange={this.handleChange}
            />
            <textarea name="content" rows="10" cols="70">
              {this.state.currentNote.content}
            </textarea>
            <Button color="info">Update</Button>
          </Box>
        </div>
      </Container>
    );
  };

  render() {
    return (
      <Container>
        <Section>
          <Box>{this.mapNotes()}</Box>
          <Modal
            modal={{ closeOnBlur: true }}
            show={this.state.show}
            onClose={this.close}
          >
            {this.openModal()}
          </Modal>
        </Section>
      </Container>
    );
  }
}

export default Notebook;
