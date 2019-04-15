import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "react-bulma-components/lib/components/container";
import {
  Field,
  Control,
  Label,
  Input
} from "react-bulma-components/lib/components/form";
import Button from "react-bulma-components/lib/components/button";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container fluid>
        <Field>
          <Label>Email</Label>
          <Control>
            <Input type="email" />
          </Control>
        </Field>
        <Field>
          <Label>Password</Label>
          <Control>
            <Input
              // color="success"
              type="password"
              // placeholder="Text input"
              // value="bulma"
            />
          </Control>
          {/* <Help color="success">This username is available</Help> */}
        </Field>
        <Button type="submit" color="info">
          Sign Up
        </Button>
      </Container>
    );
  }
}

export default SignIn;
