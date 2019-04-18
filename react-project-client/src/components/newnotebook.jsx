import React, { Component } from "react";
import Button from "react-bulma-components/lib/components/button";
import { FaPlus, FaMinus } from "react-icons/fa";
import Container from "react-bulma-components/lib/components/container";

class NewNotebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      color: "",
      toggled: false
    };
  }

  handleChange = ev => {
    this.setState({
      title: ev.target.value
    });
    let newNotebook = {};
    newNotebook.title = this.state.title;
  };

  putNewNotebook = ev => {
    ev.preventDefault();
    this.props.handleSubmit(ev);
    this.setState({ toggled: !this.state.toggled });
  };

  showNoteForm = () => {
    return (
      <Container>
        <div className="new-note">
          <form onSubmit={this.putNewNotebook}>
            <div class="field">
              <label class="label">Category</label>
              <div class="control">
                <select
                  name="category"
                  class="input"
                  type="text"
                  placeholder="Category"
                >
                  <option value="school">School</option>
                  <option value="work">Work</option>
                  <option value="to-do">To-Do</option>
                  <option value="reminders">Reminders</option>
                </select>
              </div>
            </div>

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
              <label class="label">Description</label>
              <div class="control">
                <textarea
                  name="description"
                  class="textarea"
                  placeholder="Note Content"
                />
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button id="new-note" class="button is-link">
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
          {this.state.toggled === false ? <FaPlus /> : <FaMinus />}
        </Button>
        {this.state.toggled ? this.showNoteForm() : null}
      </div>
    );
  }
}

export default NewNotebook;
