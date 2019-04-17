import React, { Component } from "react";
import Columns from "react-bulma-components/lib/components/columns";
import Container from "react-bulma-components/lib/components/container";
import Section from "react-bulma-components/lib/components/section";
import Box from "react-bulma-components/lib/components/box";
import NotebookCard from "./notebookCard";
import NewNotebook from "./newnotebook";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";

const USER = localStorage.getItem("user");
const NOTEBOOKS = `http://localhost:3000/api/v1/users/${USER}/notebooks`;
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

  handleSubmit = ev => {
    ev.preventDefault();
    let newNotebook = {
      category: ev.target.category.value,
      title: ev.target.title.value,
      description: ev.target.description.value
    };
    let newNotebooks = this.state.notebooks.slice();
    newNotebooks.push(newNotebook);
    this.setState({
      notebooks: newNotebooks
    });
    this.persistNotebook(newNotebook);
  };

  persistNotebook = newNotebook => {
    fetch(`http://localhost:3000/api/v1/users/${USER}/notebooks/`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newNotebook)
    });
  };

  render() {
    return (
      <Container>
        {
          localStorage.getItem("token") ? null : <Redirect to="/" />
        }
        <NewNotebook handleSubmit={this.handleSubmit} />
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
