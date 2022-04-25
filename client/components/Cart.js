import React, { Component } from "react";
import { connect } from "react-redux";
import { updateOrder, updateLineitem } from "../store";
import CartItem from "./CartItem";

export class Cart extends Component {
  constructor() {
    super();
  }

  render() {
    const { cart, cartItems, updateOrder, updateLineitem } = this.props;

    const Checkout = () => {
      updateOrder(cart);
      cartItems.forEach((cartItem) => {
        updateLineitem(cartItem);
      });
    };

    if (!cartItems?.length) return <h1>Nothing in Cart</h1>;
    return (
      <div>
        {cartItems.map((cartItem) => {
          return <CartItem cartItem={cartItem} key={cartItem.id} />;
        })}
        <button onClick={Checkout}> Checkout </button>
      </div>
    );
  }
}

const mapState = ({ orders, lineitems, auth }) => {
  const cart = orders.find((order) => order.userId === auth.id && order.isCart);
  const cartItems = lineitems.filter((item) => item.orderId === cart?.id);
  return {
    cart,
    cartItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateOrder: (order) => {
      dispatch(updateOrder(order));
    },
    updateLineitem: (cartItem) => {
      dispatch(updateLineitem(cartItem));
    },
  };
};

export default connect(mapState, mapDispatch)(Cart);
