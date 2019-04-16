import React, { Component } from "react";
import Button from "react-bulma-components/lib/components/button";
import { FaPencilAlt, FaMinus } from "react-icons/fa";
import Container from "react-bulma-components/lib/components/container";

class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      toggled: false
    };
  }

  handleChange = ev => {
    this.setState({
      title: ev.target.value
    });
    let newNote = {};
    newNote.title = this.state.title;
  };

  clearInputs = () => {
    this.setState({
      title: "",
      content: ""
    });
  };

  showNoteForm = () => {
    return (
      <Container>
        <div className="new-note">
          <form onSubmit={this.props.handleSubmit}>
            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                <input
                  name="title"
                  class="input"
                  type="text"
                  placeholder="Note Title"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Content</label>
              <div class="control">
                <textarea
                  name="content"
                  class="textarea"
                  placeholder="Note Content"
                />
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button onClick={() => this.clearInputs} class="button is-link">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    );
  };

  toggleButton = () => {
    this.setState({
      toggled: !this.state.toggled
    });
  };

  render() {
    return (
      <div>
        <Button id="note-toggle" onClick={() => this.toggleButton()}>
          {this.state.toggled === false ? <FaPencilAlt /> : <FaMinus />}
        </Button>
        {this.state.toggled ? this.showNoteForm() : null}
      </div>
    );
  }
}

export default NewNote;
