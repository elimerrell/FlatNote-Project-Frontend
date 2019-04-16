import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import MoreIcon from "@material-ui/icons/MoreVert";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  render() {
    return (
      <AppBar id="navbar" position="fixed" color="primary">
        {console.log(this.classes.appBar)}
        <Toolbar style={this.classes.toolbar}>
          <IconButton color="inherit" aria-label="Open drawer">
            <MenuIcon />
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

export default Navbar;
