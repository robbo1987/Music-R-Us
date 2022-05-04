import React, { Component } from "react";
import { connect } from "react-redux";
import { updateOrder, updateLineitem, guestCheckout } from "../store";
import { Link } from "react-router-dom";

class CheckoutPage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      phone: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.sameAsUser = this.sameAsUser.bind(this);
  }
  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }
  async onSave(ev) {
    ev.preventDefault();
    //const user = this.state;
  }

  sameAsUser() {
    const { auth } = this.props;
    this.setState({
      name: auth.username,
      address: auth.streetAddress,
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
    const { name, address, city, state, zip, email, phone } = this.state;
    const { onChange, sameAsUser, onSave } = this;
    const Checkout = () => {
      if (cart.id) {
        updateOrder(cart);
        cartItems.forEach((item) => {
          updateLineitem(item);
        });
      } else {
        guestCheckout(cartItems);
      }
    };
    console.log("auth", auth);
    if (!cartItems?.length) return <h1>Nothing in Cart</h1>;

    return (
      <div>
        <h1>Shipping Info</h1>
        {auth.id ? <button onClick={sameAsUser}>Same As User</button> : null}

        <form onSubmit={onSave}>
          <label htmlFor="name">Name:</label>
          <input name="name" value={name} onChange={onChange} />
          <div className="side-by-side">
            <label htmlFor="address">Street Address:</label>
            <input name="address" value={address} onChange={onChange} />
            <label htmlFor="city">City:</label>
            <input name="city" value={city} onChange={onChange} />
          </div>
          <div className="side-by-side">
            <label htmlFor="state">State:</label>
            <input name="state" value={state} onChange={onChange} />
            <label htmlFor="zip">Zip:</label>
            <input name="zip" value={zip} onChange={onChange} />
          </div>
          <div className="side-by-side">
            <label htmlFor="email">Email:</label>
            <input name="email" value={email} onChange={onChange} />
            <label htmlFor="phone">Phone:</label>
            <input name="phone" value={phone} onChange={onChange} />
          </div>

          <button>save</button>
        </form>
        {auth.id ? <button onClick={Checkout}> Checkout</button> : null}
        {!auth.id ? (
          <>
            <button onClick={Checkout}> Checkout As Guest </button>{" "}
            <Link to="/signup">Sign Up</Link>{" "}
          </>
        ) : null}
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
