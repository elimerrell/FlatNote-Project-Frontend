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
      .then(this.authenticateUser(newUser));
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
      .then(jwt => localStorage.setItem("token", jwt.auth_token));
  };

  render() {
    return (
      <Container>
        <div class="sign-in">
          <form onSubmit={this.handleSubmit}>
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input
                  name="name"
                  class="input"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    name="email"
                    class="input"
                    type="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input
                    name="password"
                    class="input"
                    type="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Confirm Password</label>
                <div class="control">
                  <input
                    name="password_confirmation"
                    class="input"
                    type="password"
                    placeholder="Password Confirmation"
                  />
                </div>
              </div>

              <div class="field is-grouped">
                <div class="control">
                  <button
                    id="new-note"
                    onClick={() => this.clearInputs}
                    class="button is-link"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </form>
          <Link to="/dashboard">
            <Button color="info">Dashboard</Button>
          </Link>
        </div>
      </Container>
    );
  }
}

export default SignUp;
