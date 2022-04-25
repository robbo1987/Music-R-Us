import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteLineitem, updateLineitem } from "../store";

export class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.cartItem.id ? this.props.cartItem.quantity : 0,
    };
  }

  render() {
    const { cartItem, instruments, deleteLineitem, updateLineitem } =
      this.props;
    const instrument = instruments.find(
      (instrument) => (instrument.id = cartItem.instrumentId)
    );
    console.log(instrument);
    const Decrease = () => {
      updateLineitem({ ...cartItem, quantity: cartItem.quantity - 1 });
    };

    const Increase = () => {
      updateLineitem({ ...cartItem, quantity: cartItem.quantity + 1 });
    };

    if (!instrument.id) return null;
    return (
      <div>
        {`Instrument: ${instrument.name}`}
        <br></br>
        {`Quantity:`}
        <button onClick={Decrease}>-</button>
        {` ${cartItem.quantity} `}
        <button onClick={Increase}>+</button>
        <br></br>
        {`Subtotal: $${cartItem.quantity * instrument.price}`}
        <button onClick={() => deleteLineitem(cartItem)}>Remove</button>
      </div>
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

export default connect(mapState, mapDispatch)(CartItem);
