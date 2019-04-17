import React, { Component } from "react";
import Columns from "react-bulma-components/lib/components/columns";
import Container from "react-bulma-components/lib/components/container";
import NotebookCard from "./notebookCard";
import NewNotebook from "./newnotebook";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notebooks: [],
      currentUser: localStorage.getItem("user")
    };
  }

  componentDidMount() {
    if (localStorage.getItem("user")) {
      fetch(
        `http://localhost:3000/api/v1/users/${
          this.state.currentUser
        }/notebooks`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
        .then(resp => resp.json())
        .then(notebooks =>
          this.setState({
            notebooks
          })
        );
    }
  }

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
    fetch(
      `http://localhost:3000/api/v1/users/${this.state.currentUser}/notebooks`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newNotebook)
      }
    );
  };

  render() {
    return (
      <Container>
        {localStorage.getItem("token") ? null : <Redirect to="/" />}
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
