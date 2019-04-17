import React, { Component } from "react";
import { Link } from "react-router-dom";
import Box from "react-bulma-components/lib/components/box";
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
      .then(() => this.authenticateUser(newUser));
  };

  authenticateUser = newUser => {
    let authUser = {
      email: newUser.email,
      password: newUser.password
    };
    fetch("http://localhost:3000/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authUser)
    })
      .then(resp => resp.json())
      .then(jwt => {
        localStorage.setItem("token", jwt.auth_token);
        this.props.history.push("/dashboard");
      });
  };

  render() {
    return (
      <Container className="sign-in-container">
      <Box>
        <div className="sign-in">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  name="name"
                  className="input"
                  type="text"
                  placeholder="Name"
                />
              </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    name="email"
                    className="input"
                    type="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    name="password"
                    className="input"
                    type="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    name="password_confirmation"
                    className="input"
                    type="password"
                    placeholder="Password Confirmation"
                  />
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button
                    id="new-note"
                    onClick={() => this.clearInputs}
                    className="button is-link"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
          </form>
        </div>
      </Box>
      </Container>
    );
  }
}

export default SignUp;
