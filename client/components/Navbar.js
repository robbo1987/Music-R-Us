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
import AdminControl from "./AdminControl";

const Navbar = ({
  handleClick,
  isLoggedIn,
  brands,
  instruments,
  isAdmin,
  isBanned,
}) => (
  <div>
    <h1>Music R Us</h1>
    {isBanned ? (
      <h1>Your Account is banned! Shame! Shame! Shame!</h1>
    ) : (
      <nav>
        {isLoggedIn ? (
          <div>
            <Link to="/home">Home</Link>
            <Link to="/instruments">Instruments ({instruments.length})</Link>
            <Link to="/brands">Shop By Brands ({brands.length})</Link>
            <Link to="/categories">Shop By Categories</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/profile">Profile</Link>
            {isAdmin && <AdminControl />}
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/instruments">Instruments ({instruments.length})</Link>
            <Link to="/brands">Shop By Brands ({brands.length})</Link>
            <Link to="/categories">Shop By Categories</Link>
            <Link to="/cart">Cart</Link>
          </div>
        )}
      </nav>
    )}
    <hr />
  </div>
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
