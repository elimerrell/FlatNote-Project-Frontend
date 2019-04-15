import React, { Component } from "react";
import Columns from "react-bulma-components/lib/components/columns";
import Container from "react-bulma-components/lib/components/container";
import NotebookCard from "./notebookCard";
// import { Link } from "react-router-dom"

const NOTEBOOKs = "http://localhost:3000/api/v1/notebooks";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notebooks: []
    };
    this.getNotebook();
  }

  getNotebook = () => {
    fetch(NOTEBOOKs)
      .then(resp => resp.json())
      .then(notebooks =>
        this.setState({
          notebooks
        })
      );
  };

  render() {
    return (
      <Container>
        <Columns>
        {
          // this.state.notebooks.length > 0 ? this.state.notebooks.map(notebook => {return <Link to={`/notebook/${notebook.id}`} component={notebook}><Columns.Column size={3}><NotebookCard notebook={notebook} /></Columns.Column></Link>}) : null
          this.state.notebooks.length > 0 ? this.state.notebooks.map(notebook => {return <Columns.Column size={3}><NotebookCard notebook={notebook} /></Columns.Column>}) : null
        }
        </Columns>
      </Container>
    );
  }
}

export default Dashboard;
