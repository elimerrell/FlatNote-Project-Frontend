import React, { Component } from "react";
import Notebook from "./notebook";

const NOTEBOOKS = "http://localhost:3000/api/v1/notebooks";
class Notebooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notebooks: []
    };
    this.getNotebooks();
  }

  getNotebook = () => {
    fetch(NOTEBOOKS)
      .then(resp => resp.json())
      .then(notebook =>
        this.setState({
          notebooks
        })
      );
  };

  mapNotebooks = () => {
    return this.state.notebooks.map(notebook => {
      return <Notebook notebook={notebook} />;
    });
  };

  render() {
    return(
        {this.mapNotebooks()}
    );

  }
}

export default Notebooks;
