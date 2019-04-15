import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import Notebook from "./components/notebook";

ReactDOM.render(
  <Router>
    <React.Fragment>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/signup" component={Signup} />
      {/* <Route path="/notebook/:id" component={Notebook} /> */}
      <Route path="/notebook/1" component={Notebook} />
    </React.Fragment>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
