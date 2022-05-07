import React, { Component } from "react";
import { connect } from "react-redux";
import { updateOrder, updateLineitem, guestCheckout } from "../store";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { Container, Box, Grid } from "@mui/material";

export class Cart extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      auth,

      cartItems,
    } = this.props;

    if (!cartItems?.length) return <h1>Nothing in Cart</h1>;

    return (
      <Container>
        <Box
          sx={{
            height: "100vh",
          }}
        >
          <Grid item container direction="column">
            {cartItems.map((cartItem) => {
              return cartItem.id ? (
                <CartItem cartItem={cartItem} key={cartItem.id} />
              ) : (
                <CartItem cartItem={cartItem} key={cartItem.instrumentId} />
              );
            })}

            <Link to="/checkoutpage">Proceed to Checkout</Link>
          </Grid>
        </Box>
      </Container>
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
// const mapDispatch = (dispatch) => {
//   return {
//     updateOrder: (order) => {
//       dispatch(updateOrder(order));
//     },
//     updateLineitem: (lineitem) => {
//       dispatch(updateLineitem(lineitem));
//     },
//     guestCheckout: (cartItems) => {
//       dispatch(guestCheckout(cartItems));
//     },
//   };
// };

export default connect(mapState)(Cart);
