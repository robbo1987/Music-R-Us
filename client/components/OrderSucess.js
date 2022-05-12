import React, { Component } from "react";
import { connect } from "react-redux";
import { updateOrder, updateLineitem, guestCheckout } from "../store";
import { Link } from "react-router-dom";

class OrderSuccess extends Component {
  constructor() {
    super();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.cartItems.length && this.props.cartItems.length) {
      const { cart, cartItems, updateOrder, updateLineitem, guestCheckout } =
        this.props;
      if (cart.id) {
        updateOrder(cart);
        cartItems.forEach((item) => {
          updateLineitem(item);
        });
      } else {
        guestCheckout(cartItems);
      }
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <>
        <h2>Thanks for shopping at Music R Us, no refunds sorry! </h2>
        {auth.id && (
          <Link to="/orders">
            <h2>Look at your orders?</h2>
          </Link>
        )}
        {!auth.id && (
          <Link to="/instruments">
            <h2>Continue Shopping?</h2>
          </Link>
        )}
      </>
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

export default connect(mapState, mapDispatch)(OrderSuccess);
