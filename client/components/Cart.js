import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export class Cart extends Component {
  constructor() {
    super();
  }

  render() {
    const { cartItems, instruments } = this.props;

    if (!cartItems?.length) return <h1>Nothing in Cart</h1>;
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Instrument</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Subtotal</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((cartItem) => {
                return cartItem.id ? (
                  <CartItem cartItem={cartItem} key={cartItem.id} />
                ) : (
                  <CartItem cartItem={cartItem} key={cartItem.instrumentId} />
                );
              })}
              <TableRow>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                  Order Total:{" $"}
                  {cartItems.reduce((acc, item) => {
                    const instrument = instruments.find(
                      (instrument) => instrument.id === item.instrumentId
                    );
                    return acc + item.quantity * instrument.price;
                  }, 0)}
                </TableCell>
                <TableCell align="right">
                  <Link to="/checkoutpage">
                    <button>Proceed to Checkout</button>
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </>
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
