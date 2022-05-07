import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

export class Cart extends Component {
  constructor() {
    super();
  }

  render() {
    const { cartItems, instruments } = this.props;

    if (!cartItems?.length) return <h1>Nothing in Cart</h1>;
    return (
      <div>
        <ul>
          {cartItems.map((cartItem) => {
            return cartItem.id ? (
              <CartItem cartItem={cartItem} key={cartItem.id} />
            ) : (
              <CartItem cartItem={cartItem} key={cartItem.instrumentId} />
            );
          })}
          Order Total:{" "}
          {cartItems.reduce((acc, item) => {
            const instrument = instruments.find(
              (instrument) => instrument.id === item.instrumentId
            );
            return acc + item.quantity * instrument.price;
          }, 0)}
        </ul>
        <Link to="/checkoutpage">Proceed to Checkout</Link>
      </div>
    );
  }
}

const mapState = ({ orders, lineitems, auth, instruments }) => {
  if (auth.id) {
    const cart = orders.find(
      (order) => order.userId === auth.id && order.isCart
    );
    const cartItems = lineitems.filter((item) => item.orderId === cart?.id);
    return {
      cartItems,
      instruments,
    };
  } else {
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    return {
      cartItems: lineitems,
      instruments,
    };
  }
};

export default connect(mapState)(Cart);
