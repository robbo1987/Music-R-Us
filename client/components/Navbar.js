import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, resetOrders, resetLineitem } from "../store";

const Navbar = ({ handleClick, isLoggedIn, brands, instruments }) => (
  <div>
    <h1>Music R Us</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/instruments">Instruments ({instruments.length})</Link>
          <Link to="/brands">Shop By Brands ({brands.length})</Link>
          <Link to="/categories">Shop By Categories</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/profile">Profile</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/instruments">Instruments ({instruments.length})</Link>
          <Link to="/brands">Shop By Brands ({brands.length})</Link>
          <Link to="/categories">Shop By Categories</Link>
          <Link to="/cart">Cart</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

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
