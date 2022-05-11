import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: false,
    };
  }

  handleClick = (ev) => {
    this.setState({
      anchorEl: ev.currentTarget,
    });
  };
  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
  render() {
    const open = Boolean(this.state.anchorEl);
    const { handleClick, handleClose } = this;
    const { isAdmin } = this.props;

    return (
      <>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{
            color: "#551A8B",
            fontSize: "16px",
            fontFamily: "Roboto, helvetica, Arial, sans-serif",
            textTransform: "none",
          }}
        >
          Settings
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={this.state.anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/Profile">Profile </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/Orders">Orders </Link>
          </MenuItem>
          {isAdmin && (
            <div>
              <MenuItem onClick={handleClose}>
                <Link to="/AdminControl/updateinstruments">
                  Update Instruments{" "}
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/AdminControl/allusers">See All Users </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/AdminControl/allorders">See All Orders </Link>
              </MenuItem>
            </div>
          )}
        </Menu>
      </>
    );
  }
}
const mapState = (state) => {
  return {
    isAdmin: state.auth.isAdmin,
  };
};

export default connect(mapState)(Settings);
