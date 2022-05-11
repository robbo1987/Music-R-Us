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
    return (
      <div>
        Thanks for shopping at Music R Us, no refunds sorry!
        <Link to="/orders">Your Orders</Link>
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

export default connect(mapState, mapDispatch)(OrderSuccess);
