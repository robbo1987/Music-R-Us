import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCart } from "../store";
import { Link } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

class CheckoutPage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      phone: "",
    };
  }
  onChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };

  sameAsUser = () => {
    const { auth } = this.props;
    this.setState({
      name: auth.username,
      streetAddress: auth.streetAddress,
      city: auth.city,
      state: auth.state,
      zip: auth.zip,
      email: auth.email,
      phone: auth.phone,
    });
  };

  checkout = async (ev) => {
    ev.preventDefault();
    const { cart, cartItems, updateCart } = this.props;
    const url = (await axios.post("/api/stripe/checkout", { cartItems })).data;
    if (cart.id) {
      const updatedCart = { ...cart, ...this.state };
      updateCart(updatedCart);
    }
    window.location = url;
  };

  render() {
    const { auth, cartItems } = this.props;
    const { name, streetAddress, city, state, zip, email, phone } = this.state;
    const { onChange, sameAsUser, checkout } = this;
    const disabledButton =
      !name || !streetAddress || !city || !state || !zip || !email || !phone;

    if (!cartItems?.length) return <h1>Nothing in Cart</h1>;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping Info
        </Typography>
        {auth.id ? (
          <button
            style={{ padding: "5px", margin: "10px" }}
            onClick={sameAsUser}
          >
            Same As User
          </button>
        ) : null}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="name"
              name="name"
              label="Name"
              value={name}
              onChange={onChange}
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="streetAddress"
              name="streetAddress"
              label="Street Address"
              value={streetAddress}
              onChange={onChange}
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              value={city}
              onChange={onChange}
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              value={state}
              onChange={onChange}
              label="State/Province/Region"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              value={zip}
              onChange={onChange}
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              label="E-mail"
              fullWidth
              autoComplete="email"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              name="phone"
              value={phone}
              onChange={onChange}
              label="Phone Number"
              fullWidth
              variant="standard"
            />
          </Grid>
        </Grid>
        {auth.id ? (
          <button
            style={{ padding: "5px", margin: "10px" }}
            disabled={disabledButton}
            onClick={checkout}
          >
            Checkout
          </button>
        ) : null}
        {!auth.id ? (
          <>
            <button
              style={{ padding: "5px", margin: "10px" }}
              disabled={disabledButton}
              onClick={checkout}
            >
              Checkout As Guest{" "}
            </button>{" "}
            <Link to="/signup">
              <button style={{ padding: "5px", margin: "10px" }}>
                Sign Up
              </button>
            </Link>{" "}
          </>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapState = ({ orders, lineitems, auth }) => {
  if (auth.id) {
    const cart = orders.find(
      (order) => order.userId === auth.id && order.isCart
    );
    const cartItems = lineitems.filter((item) => item.orderId === cart?.id);
    return {
      auth,
      cart,
      cartItems,
    };
  } else {
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    return {
      auth,
      cart,
      cartItems: lineitems,
    };
  }
};
const mapDispatch = (dispatch) => {
  return {
    updateCart: (cart) => {
      dispatch(updateCart(cart));
    },
  };
};

export default connect(mapState, mapDispatch)(CheckoutPage);
