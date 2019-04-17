import React, { Component } from "react";
import PropTypes from "prop-types";
import Note from "./note";
import Container from "react-bulma-components/lib/components/container";

import PaperBG from "../paper_fibers.png";

import Section from "react-bulma-components/lib/components/section";
import Box from "react-bulma-components/lib/components/box";
import Button from "react-bulma-components/lib/components/button";
import Modal from "react-bulma-components/lib/components/modal";
import NewNote from "./newnote";
import { CirclePicker } from "react-color";
import Draggable from "react-draggable";
import { FaTrashAlt } from "react-icons/fa";

const USER = localStorage.getItem("user");
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
    fetch(
      `http://localhost:3000/api/v1/users/${USER}/notebooks/${
        params.notebookId
      }/notes`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    )
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
      `http://localhost:3000/api/v1/users/${USER}/notebooks/${
        this.state.currentNote.notebook_id
      }/notes/${this.state.currentNote.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
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
      `http://localhost:3000/api/v1/users/${USER}/notebooks/${
        this.state.currentNote.notebook_id
      }/notes/${this.state.currentNote.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
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
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    name="title"
                    className="input"
                    type="text"
                    value={this.state.currentNote.title}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Content</label>
                <div className="control">
                  <textarea
                    name="content"
                    className="textarea"
                    value={this.state.currentNote.content}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="color-picker-wrapper">
                <CirclePicker
                  className="color-picker"
                  colors={[
                    "#FF9AA2",
                    "#FFB7B2",
                    "#FFDAC1",
                    "#FFFFA5",
                    "#E2F0CB",
                    "#B5EAD7",
                    "#C7CEEA",
                    "#F5E1Fd",
                    "#CE9DD9",
                    "#E9E2D7",
                    "#BFD5d3",
                    "#D9FFFF"
                  ]}
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
      content: ev.target.content.value,
      color: "#FFFFA5"
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
    const {
      match: { params }
    } = this.props;
    console.log("persist note function");
    fetch(
      `http://localhost:3000/api/v1/users/${USER}/notebooks/${
        params.notebookId
      }/notes`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newNote)
      }
    );
  };

  render() {
    return (
      <>
        <NewNote handleSubmit={this.handleSubmit} />
        <Container class="notebook">
          <Section>
            <Draggable bounds={{ top: 0, left: 0, right: 0, bottom: 0 }}>
              <Box>{this.mapNotes()}</Box>
            </Draggable>
            <Modal class="modal" show={this.state.show} onClose={this.close}>
              {this.openModal()}
            </Modal>
          </Section>
        </Container>
      </>
    );
  }
}

export default Notebook;
