import React, { Component } from "react";
import Box from "react-bulma-components/lib/components/box";
import Container from "react-bulma-components/lib/components/container";
import { withRouter } from "react-router-dom";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = ev => {
    ev.preventDefault();
    let user = {
      email: ev.target.email.value,
      password: ev.target.password.value
    };
    fetch("http://localhost:3000/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(jwt => this.setStorage(jwt));
  };

  setStorage = jwt => {
    let jwtArray = jwt.auth_token.split(".");
    let decode = jwtArray[1];
    let decodedString = atob(decode);
    let user_id = JSON.parse(decodedString).user_id;
    localStorage.setItem("token", jwt.auth_token);
    localStorage.setItem("user", user_id);
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <Container className="sign-in-container">
        <Box className="wrapper">
          <div className="sign-in">
            <form onSubmit={this.handleSubmit}>
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

              <div className="field is-grouped">
                <div className="control">
                  <button
                    className="green-button"
                    onClick={() => this.clearInputs}
                    className="button is-link"
                  >
                    Log In
                  </button>
                  <button
                    className="green-button"
                    onClick={() => this.props.history.push("/signup")}
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

export default SignIn;
