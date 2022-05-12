import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteLineitem, updateLineitem } from "../store";
import { Link } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export class Cartitem extends Component {
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
      <TableRow key={cartItem.id}>
        <TableCell>
          <Link to={`/instruments/${instrument.id}`}>{instrument.name}</Link>
        </TableCell>
        <TableCell align="right">
          <button onClick={Decrease}>-</button>
          {` ${cartItem.quantity} `} <button onClick={Increase}>+</button>
        </TableCell>
        <TableCell align="right">
          ${cartItem.quantity * instrument.price}
        </TableCell>
        <TableCell align="right">
          <button onClick={() => deleteLineitem(cartItem)}>Remove</button>
        </TableCell>
      </TableRow>
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

export default connect(mapState, mapDispatch)(Cartitem);
