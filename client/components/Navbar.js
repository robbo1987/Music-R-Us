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
