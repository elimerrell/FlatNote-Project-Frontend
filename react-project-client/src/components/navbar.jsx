import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import MoreIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.classes = {
      appBar: {
        top: "auto",
        bottom: 0
      },
      toolbar: {
        alignItems: "center",
        justifyContent: "space-between"
      },
      fabButton: {
        position: "absolute",
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: "0 auto"
      }
    };
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  sendPage = ev => {
    if (ev.target.textContent === "Dashboard") {
      this.props.history.push("/dashboard");
    } else if (ev.target.textContent === "About") {
      this.props.history.push("/about");
    } else if (ev.target.textContent === "Sign Out") {
      localStorage.clear("token");
      this.props.history.push("/signin");
    } else if (ev.target.textContent === "Sign In") {
      localStorage.clear("token", "user");
      this.props.history.push("/signin");
    }
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <AppBar id="navbar" position="fixed" color="primary">
        <Toolbar style={this.classes.toolbar}>
          <IconButton color="inherit" aria-label="Open drawer">
            <MenuIcon onClick={this.handleClick} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              onClick={ev => this.sendPage(ev)}
            >
              <MenuItem onClick={this.handleClose}>Dashboard</MenuItem>
              <MenuItem onClick={this.handleClose}>About</MenuItem>
              {localStorage.getItem("token") ? (
                <MenuItem onClick={this.handleClose}>Sign Out</MenuItem>
              ) : (
                <MenuItem onClick={this.handleClose}>Sign In</MenuItem>
              )}
            </Menu>
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={this.classes.grow}
          >
            FlatNote
          </Typography>
          <div>
            <IconButton color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(Navbar);
