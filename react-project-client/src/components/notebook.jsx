import React, { Component } from "react";
import PropTypes from "prop-types";
import Note from "./note";
import Container from "react-bulma-components/lib/components/container";

import Section from "react-bulma-components/lib/components/section";
import Box from "react-bulma-components/lib/components/box";
import Button from "react-bulma-components/lib/components/button";
import Modal from "react-bulma-components/lib/components/modal";
import NewNote from "./newnote";
import { CirclePicker } from "react-color";
import Draggable from "react-draggable";
import { FaTrashAlt } from "react-icons/fa";

class Notebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      currentNote: {},
      show: false,
      color: ""
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

  handleChange = ev => {
    const attr = ev.target.name;
    const value = ev.target.value;
    const currentNoteValue = this.state.currentNote;
    currentNoteValue[attr] = value;
    this.setState({ currentNote: currentNoteValue });
  };

  handleColorChange = ev => {
    let note = document.getElementById(this.state.currentNote.id);
    note.style.backgroundColor = ev.hex;
    this.setState({
      color: ev.hex
    });
  };

  patchNote = () => {
    const note = this.state.currentNote;
    note.color = this.state.color;
    fetch(
      `http://localhost:3000/api/v1/notebooks/${
        this.state.currentNote.notebook_id
      }/notes/${this.state.currentNote.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note)
      }
    );
    this.setState({ show: false, currentNote: {} });
  };

  deleteNote = () => {
    let newNoteArray = this.state.notes.filter(
      note => note.id !== this.state.currentNote.id
    );
    this.setState({
      notes: newNoteArray
    });
    const note = this.state.currentNote;
    fetch(
      `http://localhost:3000/api/v1/notebooks/${
        this.state.currentNote.notebook_id
      }/notes/${this.state.currentNote.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note)
      }
    );
    this.setState({ show: false, currentNote: {} });
  };

  handleSubmit = ev => {
    ev.preventDefauly();
    this.patchNote();
  };

  openModal = () => {
    return (
      <Container>
        <div className="modal-box">
          <Box>
            <form action="submit" onSubmit={this.handleSubmit}>
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input
                    name="title"
                    class="input"
                    type="text"
                    value={this.state.currentNote.title}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Content</label>
                <div class="control">
                  <textarea
                    name="content"
                    class="textarea"
                    value={this.state.currentNote.content}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="color-picker-wrapper">
                <CirclePicker
                  className="color-picker"
                  noteColor={this.state.noteColor}
                  onChange={this.handleColorChange}
                />
              </div>
              <Button color="info" onClick={this.patchNote}>
                Update
              </Button>
              <Button color="danger" onClick={this.deleteNote}>
                <FaTrashAlt />
              </Button>
            </form>
          </Box>
        </div>
      </Container>
    );
  };

  handleSubmit = ev => {
    ev.preventDefault();
    let newNote = {
      title: ev.target.title.value,
      content: ev.target.content.value
    };
    if (newNote.title.length > 0 && newNote.content.length > 0) {
      let newNotes = this.state.notes.slice();
      newNotes.push(newNote);
      this.setState({
        notes: newNotes
      });
      this.persistNote(newNote);
    } else {
      alert("Your note is empty!");
    }
  };

  persistNote = newNote => {
    fetch(
      `http://localhost:3000/api/v1/notebooks/${
        this.state.currentNote.notebook_id
      }/notes`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote)
      }
    );
  };

  render() {
    return (
      <>
        <NewNote handleSubmit={this.handleSubmit} />
        <Container>
          <Section>
            <Draggable bounds={{ top: 0, left: 0, right: 0, bottom: 0 }}>
              <Box>{this.mapNotes()}</Box>
            </Draggable>
            <Modal
              modal={{ closeOnBlur: true }}
              show={this.state.show}
              onClose={this.close}
            >
              {this.openModal()}
            </Modal>
          </Section>
        </Container>
      </>
    );
  }
}

export default Notebook;
