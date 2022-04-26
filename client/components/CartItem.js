import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteLineitem, updateLineitem } from "../store";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
    };
  }

  render() {
    const { quantity } = this.state;
    const { instruments, cartItem, deleteLineitem, updateLineitem } =
      this.props;
    const instrument = instruments.find(
      (instrument) => instrument.id === cartItem.instrumentId
    );

    const Change = (ev) => {
      this.setState({
        [ev.target.name]: ev.target.value,
      });
    };
    const Submit = (ev) => {
      ev.preventDefault();
      if (!lineitem) setCart(item);
      else
        updateLineitem({
          ...lineitem,
          quantity: quantity * 1 + lineitem?.quantity,
        });
      window.alert(`${quantity} ${instrument.name} added to cart!`);
    };

    if (!instrument) return null;

    return (
      <div>
        {`Instrument: ${instrument.name}`}
        <br></br>
        {`Quantity:`}
        <form onSubmit={Submit}>
          <input
            type="number"
            name="quantity"
            min="0"
            value={quantity}
            onChange={Change}
          />
        </form>
        {`Subtotal: $${quantity * instrument.price}`}
        <br></br>
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

export default connect(mapState, mapDispatch)(Cart);
