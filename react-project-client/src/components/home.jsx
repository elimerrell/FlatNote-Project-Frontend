import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
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
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Name: </label>
              <input type="text" name="name" />
            </div>
            <div>
              <label>Email: </label>
              <input type="text" name="email" />
            </div>
            <div>
              <label>Password: </label>
              <input type="password" name="password" />
            </div>
            <div>
              <label>Confirm: </label>
              <input type="password" name="password_confirmation" />
            </div>
            <button type="submit">Sign-up</button>
          </form>
          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>
        </header>
      </div>
    );
  }
}

export default Home;
