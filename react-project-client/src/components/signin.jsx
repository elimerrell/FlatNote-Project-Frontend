import React, { Component } from "react";
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
      <div class="sign-in">
        <Container>
          <form onSubmit={this.handleSubmit}>
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

            <div class="field is-grouped">
              <div class="control">
                <button
                  id="new-note"
                  onClick={() => this.clearInputs}
                  class="button is-link"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Container>
      </div>
    );
  }
}

export default SignIn;
