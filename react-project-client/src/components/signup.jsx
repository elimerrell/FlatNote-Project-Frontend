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

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      authToken: ""
    };
  }

  handleSubmit = ev => {
    ev.preventDefault();

    const newUser = {};

    newUser.name = ev.target.name.value;
    newUser.email = ev.target.email.value;
    newUser.password = ev.target.password.value;
    newUser.password_confirmation = ev.target.password_confirmation.value;

    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(user => this.authenticateUser(user));
  };

  authenticateUser = user => {
    // debugger
    fetch("http://localhost:3000/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        password: user.password_digest
      })
    })
      .then(response => response.json())
      .then(json => this.assignToken(json.auth_token));
  };

  assignToken = token => {
    window.localStorage.setItem("authToken", token);
    this.setStateToken(token);
  };

  setStateToken = token => {
    this.setState({ authToken: token });
  };

  checkToken = () => {
    if (window.localStorage.getItem("authToken")) {
      console.log(window.localStorage.getItem("authToken"));
      this.setState({ authToken: window.localStorage.getItem("authToken") });
    } else {
      console.log("Token not found");
    }
  };

  render() {
    return (
      <Container fluid>
        <form onSubmit={this.handleSubmit}>
          <Field>
            <Label>Name</Label>
            <Control>
              <Input placeholder="Text input" />
            </Control>
          </Field>
          <Field>
            <Label>Email</Label>
            <Control>
              <Input type="email" placeholder="Email input" />
            </Control>
            {/* <Help color="danger">This email is invalid</Help> */}
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
          <Field>
            <Label>Confirm Password</Label>
            <Control>
              <Input
                // color="success"
                type="password"
                // placeholder="Text input"
                // value="bulma"
              />
            </Control>
          </Field>
          <Button type="submit" color="info">
            Sign Up
          </Button>
        </form>
        <Link to="/dashboard">
          <Button color="info">Dashboard</Button>
        </Link>
      </Container>
    );
  }
}

export default SignUp;
