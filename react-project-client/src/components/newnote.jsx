import React, { Component } from "react";
import Button from "react-bulma-components/lib/components/button";

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
    let newReview = {};
    newReview.title = this.state.title;
  };

  showNoteForm = () => {
    return (
      <div className="new-note" onInput={this.handleChange}>
        <label htmlFor="title">Title</label>
        <h3
          id="title"
          name="title"
          contentEditable="true"
          placeholder="Title"
          inputMode="text"
          //   onChange={this.handleChange}
        />
        <label htmlFor="content">Content</label>
        <p
          id="content"
          name="content"
          contentEditable="true"
          placeholder="Content"
          inputMode="text"
          //   onChange={this.handleChange}
        />
      </div>
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
        <Button onClick={() => this.toggleButton()}>New Note</Button>
        {this.state.toggled ? this.showNoteForm() : null}
      </div>
    );
  }
}

export default NewNote;
