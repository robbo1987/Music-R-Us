import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
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
        <AppBar position="fixed" sx={{ bgcolor: "#BCBABE" }}>
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
                    sx={{
                      color: "#FFFFFF",
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                    }}
                  >
                    Music R Us
                    <MusicNoteIcon />
                  </Typography>
                </Link>
                <MenuItem>
                  <Link to="/instruments">
                    <Typography textAlign="center" sx={{ color: "#FFFFFF" }}>
                      Instruments ({instruments.length})
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/brands">
                    <Typography textAlign="center" sx={{ color: "#FFFFFF" }}>
                      Shop By Brands ({brands.length})
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/categories">
                    <Typography textAlign="center" sx={{ color: "#FFFFFF" }}>
                      Shop By Categories
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/cart">
                    <Typography textAlign="center" sx={{ color: "#FFFFFF" }}>
                      Cart
                    </Typography>
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
                    <Typography textAlign="center" sx={{ color: "#FFFFFF" }}>
                      Logout
                    </Typography>
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
                    sx={{
                      color: "#FFFFFF",
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                    }}
                  >
                    Music R Us
                    <MusicNoteIcon />
                  </Typography>
                </Link>
                <MenuItem>
                  <Link to="/login">
                    <Typography textAlign="center" sx={{ color: "#FFFFFF" }}>
                      Login
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/signup">
                    <Typography textAlign="center" sx={{ color: "#FFFFFF" }}>
                      Sign Up
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/instruments">
                    <Typography textAlign="center" sx={{ color: "#FFFFFF" }}>
                      Instruments ({instruments.length})
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/brands">
                    <Typography textAlign="center" sx={{ color: "#FFFFFF" }}>
                      Shop By Brands ({brands.length})
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/categories">
                    <Typography textAlign="center" sx={{ color: "#FFFFFF" }}>
                      Shop By Categories
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/cart">
                    <Typography textAlign="center" sx={{ color: "#FFFFFF" }}>
                      Cart
                    </Typography>
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
