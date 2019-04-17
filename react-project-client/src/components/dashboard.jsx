import React, { Component } from "react";
import Columns from "react-bulma-components/lib/components/columns";
import Container from "react-bulma-components/lib/components/container";
import Section from "react-bulma-components/lib/components/section";
import Box from "react-bulma-components/lib/components/box";
import NotebookCard from "./notebookCard";
import { withRouter } from "react-router-dom";

const NOTEBOOKS = "http://localhost:3000/api/v1/users/1/notebooks";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notebooks: []
    };
    this.getNotebook();
  }

  getNotebook = () => {
    fetch(NOTEBOOKS, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(resp => resp.json())
      .then(notebooks =>
        this.setState({
          notebooks
        })
      );
  };

  handleClick = notebook => {
    console.log(notebook);
    this.props.history.push(`/notebook/${notebook.id}`);
  };

  render() {
    return (
      <Container>
        <div className="dashboard">
          <Columns>
            {this.state.notebooks.length > 0
              ? this.state.notebooks.map(notebook => {
                  return (
                    <Columns.Column size={3}>
                      <NotebookCard
                        notebook={notebook}
                        handleClick={this.handleClick}
                      />
                    </Columns.Column>
                  );
                })
              : null}
          </Columns>
        </div>
      </Container>
    );
  }
}

export default Dashboard;
