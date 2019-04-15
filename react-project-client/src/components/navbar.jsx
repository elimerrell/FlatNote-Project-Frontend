import React, { Component } from "react";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <h1>
        This is a{" "}
        <a href="https://couds.github.io/react-bulma-components/?selectedKind=Navbar&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Fstories%2Fstories-panel">
          Navbar
        </a>
      </h1>
    );
  }
}

export default Navbar;
