import React from "react";


import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, resetOrders, resetLineitem } from "../store";
import AdminControl from "./AdminControl";

const Navbar = ({
  handleClick,
  isLoggedIn,
  brands,
  instruments,
  isAdmin,
  isBanned,
}) => (
  <Container>
    {isBanned ? (
      <h1>Your Account is banned! Shame! Shame! Shame!</h1>
    ) : (
      <AppBar position="fixed">
        <Container maxWidth="xl">
          {isLoggedIn ? (
            <Toolbar disableGutters>
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
              <MenuItem>
                <Link to="/profile">
                  <Typography textAlign="center">Profile</Typography>
                </Link>
              </MenuItem>
              <MenuItem>{isAdmin && <AdminControl />}</MenuItem>
              <MenuItem>
                <a href="#" onClick={handleClick}>
                  <Typography textAlign="center">Logout</Typography>
                </a>
              </MenuItem>
            </Toolbar>
          ) : (
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                Music R Us
                <MusicNoteIcon />
              </Typography>
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
    )}
  </Container>
);

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    instruments: state.instruments,
    brands: state.brands,
    lineitems: state.lineitems,
    isAdmin: state.auth.isAdmin,
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
