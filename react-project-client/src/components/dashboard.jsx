import React, { Component } from "react";
// import Columns from "react-bulma-components/lib/components/columns";
import Notebook from "./notebook";

const NOTEBOOK = "http://localhost:3000/api/v1/notebooks/1/";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notebook: []
    };
    this.getNotebook();
  }

  getNotebook = () => {
    fetch(NOTEBOOK)
      .then(resp => resp.json())
      .then(notebook =>
        this.setState({
          notebook
        })
      );
  };

  render() {
    return (
      <div>
        <Notebook notebook={this.state.notebook} />
      </div>
    );
  }
}

export default Dashboard;
