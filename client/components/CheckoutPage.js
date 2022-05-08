import React, { Component } from "react";
import { connect } from "react-redux";
import { updateOrder, updateLineitem, guestCheckout } from "../store";
import { Link } from "react-router-dom";

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
    this.onChange = this.onChange.bind(this);
    this.sameAsUser = this.sameAsUser.bind(this);
  }
  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  sameAsUser() {
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
  }

  render() {
    const {
      auth,
      cart,
      cartItems,
      updateOrder,
      updateLineitem,
      guestCheckout,
    } = this.props;
    const { name, streetAddress, city, state, zip, email, phone } = this.state;
    const { onChange, sameAsUser } = this;
    const disabledButton =
      !name || !streetAddress || !city || !state || !zip || !email || !phone;

    const Checkout = (ev) => {
      ev.preventDefault();
      if (cart.id) {
        const order = { ...cart, ...this.state };
        console.log(order);
        updateOrder(order);
        cartItems.forEach((item) => {
          updateLineitem(item);
        });
      } else {
        guestCheckout(cartItems);
      }
    };

    if (!cartItems?.length) return <h1>Nothing in Cart</h1>;

    return (
      <div>
        <h1>Shipping Info</h1>
        {auth.id ? <button onClick={sameAsUser}>Same As User</button> : null}

        <form onSubmit={Checkout}>
          <label htmlFor="name">Name:</label>
          <input name="name" value={name} onChange={onChange} />
          <div className="side-by-side">
            <label htmlFor="streetAddress">Street Address:</label>
            <input
              name="streetAddress"
              value={streetAddress}
              onChange={onChange}
            />
            <label htmlFor="city">City:</label>
            <input name="city" value={city} onChange={onChange} />
          </div>
          <div className="side-by-side">
            <label htmlFor="state">State:</label>
            <input name="state" value={state} onChange={onChange} />
            <label htmlFor="zip">Zip:</label>
            <input type="number" name="zip" value={zip} onChange={onChange} />
          </div>
          <div className="side-by-side">
            <label htmlFor="email">Email:</label>
            <input name="email" value={email} onChange={onChange} />
            <label htmlFor="phone">Phone:</label>
            <input name="phone" value={phone} onChange={onChange} />
          </div>
          {auth.id ? <button disabled={disabledButton}>Checkout</button> : null}
          {!auth.id ? (
            <>
              <button disabled={disabledButton}>Checkout As Guest </button>{" "}
              <Link to="/signup">Sign Up</Link>{" "}
            </>
          ) : null}
        </form>
      </div>
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
    updateOrder: (order) => {
      dispatch(updateOrder(order));
    },
    updateLineitem: (lineitem) => {
      dispatch(updateLineitem(lineitem));
    },
    guestCheckout: (cartItems) => {
      dispatch(guestCheckout(cartItems));
    },
  };
};

export default connect(mapState, mapDispatch)(CheckoutPage);
