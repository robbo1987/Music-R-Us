import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, resetOrders, resetLineitem } from "../store";

const Navbar = ({ handleClick, isLoggedIn, brands, instruments }) => {
  return (
    <div>
      <h1>Music R Us</h1>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          {isLoggedIn ? (
            <Toolbar disableGutters>
              {/* The navbar will show these links after you log in */}
              <MusicNoteIcon />
              <MenuItem>
                <Link to="/home">
                  <Typography textAlign="center">Home</Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/instruments">
                  <Typography textAlign="center">
                    Instruments ({instruments.length})
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/brands">
                  <Typography textAlign="center"></Typography>Shop By Brands (
                  {brands.length})
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/categories">
                  <Typography textAlign="center">Shop By Categories</Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/cart">
                  <Typography textAlign="center">Cart</Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/orders">
                  <Typography textAlign="center">Orders</Typography>
                </Link>
              </MenuItem>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </Toolbar>
          ) : (
            <Toolbar>
              {/* The navbar will show these links before you log in */}
              <MusicNoteIcon />
              <MenuItem>
                <Link to="/login">
                  <Typography textAlign="center">Login</Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/signup">
                  <Typography textAlign="center"></Typography>Sign Up
                </Link>
              </MenuItem>

              <MenuItem>
                <Link to="/instruments">
                  <Typography textAlign="center">
                    Instruments ({instruments.length})
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/brands">
                  <Typography textAlign="center"></Typography>Shop By Brands (
                  {brands.length})
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/categories">
                  <Typography textAlign="center">Shop By Categories</Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/cart">
                  <Typography textAlign="center">Cart</Typography>
                </Link>
              </MenuItem>
            </Toolbar>
          )}
        </Container>
      </AppBar>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    instruments: state.instruments,
    brands: state.brands,
    lineitems: state.lineitems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(resetOrders());
      dispatch(resetLineitem());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
