import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteLineitem, updateLineitem } from "../store";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
export class Cart extends Component {
  constructor() {
    super();
  }

  render() {
    const { instruments, cartItem, deleteLineitem, updateLineitem } =
      this.props;
    const instrument = instruments.find(
      (instrument) => instrument.id === cartItem.instrumentId
    );

    const Decrease = () => {
      updateLineitem({ ...cartItem, quantity: cartItem.quantity - 1 });
    };
    const Increase = () => {
      updateLineitem({ ...cartItem, quantity: cartItem.quantity + 1 });
    };

    if (!instrument) return null;

    return (
      <Card>
        Instrument:
        <Link to={`/instruments/${instrument.id}`}>{instrument.name}</Link>
        <br></br>
        {`Quantity:`} <button onClick={Decrease}>-</button>
        {` ${cartItem.quantity} `} <button onClick={Increase}>+</button>
        <br></br>
        {`Subtotal: $${cartItem.quantity * instrument.price}`}
        <br></br>
        <button onClick={() => deleteLineitem(cartItem)}>Remove</button>
      </Card>
    );
  }
}

const mapState = ({ instruments }) => {
  return {
    instruments,
  };
};
const mapDispatch = (dispatch) => {
  return {
    deleteLineitem: (cartItem) => {
      dispatch(deleteLineitem(cartItem));
    },
    updateLineitem: (cartItem) => {
      dispatch(updateLineitem(cartItem));
    },
  };
};

export default connect(mapState, mapDispatch)(Cart);
