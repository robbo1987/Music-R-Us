import React, { Component } from "react";
import { connect } from "react-redux";
import { updateOrder, updateLineitem, guestCheckout } from "../store";
import CartItem from "./CartItem";

export class Cart extends Component {
  constructor() {
    super();
  }

  render() {
    const { cart, cartItems, updateOrder, updateLineitem, guestCheckout } =
      this.props;

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

    if (!cartItems?.length) return <h1>Nothing in Cart</h1>;

    return (
      <div>
        <ul>
          {cartItems.map((cartItem) => {
            return <CartItem cartItem={cartItem} key={cartItem.instrumentId} />;
          })}
        </ul>
        <button onClick={Checkout}> Checkout </button>
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
      cart,
      cartItems,
    };
  } else {
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    return {
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

export default connect(mapState, mapDispatch)(Cart);
