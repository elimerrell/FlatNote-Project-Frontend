import React from "react";
import Card from 'react-bulma-components/lib/components/card';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';

const NotebookCard = (props) => {

  return (
    <Card>
      <Card.Content>
        <Heading>{props.notebook.title}</Heading>
        <Content>{props.notebook.description}</Content>
      </Card.Content>
    </Card>
  );
}

export default NotebookCard;
