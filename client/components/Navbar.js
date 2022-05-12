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
import Settings from "./Settings";

const Navbar = ({ handleClick, isLoggedIn, brands, instruments, isBanned }) => {
  return (
    <Container>
      {isBanned ? (
        <h1>Your Account is banned! Shame! Shame! Shame!</h1>
      ) : (
        <AppBar position="fixed">
          <Container maxWidth="xl">
            {isLoggedIn ? (
              <Toolbar
                disableGutters
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link to="/home">
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                  >
                    Music R Us
                    <MusicNoteIcon />
                  </Typography>
                </Link>
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
                    <Typography textAlign="center">
                      Shop By Categories
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/cart">
                    <Typography textAlign="center">Cart</Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <a href="#">
                    <Typography textAlign="center">
                      <Settings />
                    </Typography>
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" onClick={handleClick}>
                    <Typography textAlign="center">Logout</Typography>
                  </a>
                </MenuItem>
              </Toolbar>
            ) : (
              <Toolbar
                disableGutters
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link to="/home">
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                  >
                    Music R Us
                    <MusicNoteIcon />
                  </Typography>
                </Link>
                <MenuItem>
                  <Link to="/login">
                    <Typography textAlign="center">Login</Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/signup">
                    <Typography textAlign="center">Sign Up</Typography>
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
                    <Typography textAlign="center">
                      Shop By Categories
                    </Typography>
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
      )}
    </Container>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    instruments: state.instruments,
    brands: state.brands,
    lineitems: state.lineitems,
    isBanned: state.auth.isBanned,
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
