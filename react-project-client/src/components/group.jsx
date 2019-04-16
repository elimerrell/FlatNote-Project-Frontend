import React, { Component } from "react";
import Columns from "react-bulma-components/lib/components/columns";
import Container from "react-bulma-components/lib/components/container";
import NotebookCard from "./notebookCard";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notebooks: []
    };
    this.getNotebooks();
  }

  getNotebooks = () => {
    const {
      match: { params }
    } = this.props;
    fetch(`http://localhost:3000/api/v1/groups/${params.groupId}/notebooks`)
      .then(resp => resp.json())
      .then(notebooks =>
        this.setState({
          notebooks
        })
      );
  };

  handleClick = notebook => {
    this.props.history.push(`./${notebook.group_id}/notebook/${notebook.id}`);
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

export default Group;
