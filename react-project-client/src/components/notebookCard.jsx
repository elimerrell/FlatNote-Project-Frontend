import React from "react";
import Card from "react-bulma-components/lib/components/card";
import Content from "react-bulma-components/lib/components/content";
import Heading from "react-bulma-components/lib/components/heading";
import Button from "react-bulma-components/lib/components/button";
import { FaTrashAlt } from "react-icons/fa";

const NotebookCard = props => {
  return (
    <Card>
      <Card.Content>
        <Heading>{props.notebook.title}</Heading>
        <Content>{props.notebook.description}</Content>
        <Button color="info" onClick={() => props.handleClick(props.notebook)}>
          Open
        </Button>
        <Button
          color="danger"
          onClick={() => props.handleDelete(props.notebook)}
        >
          <FaTrashAlt />
        </Button>
      </Card.Content>
    </Card>
  );
};

export default NotebookCard;
