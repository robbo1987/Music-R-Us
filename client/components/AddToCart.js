import React from "react";
import { connect } from "react-redux";
import {createLineItem} from "../store"

class AddToCart extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
      orderId: '',
      instrumentId: '',
    };
  }

  render() {
    const { quantity, orderId, instrumentId } = this.state;
    const item = { quantity, orderId, instrumentId };
    return (
      <div>
        <button
          onClick={() => {
            this.props.setCart(item);
          }}
        >
          Add to Cart
        </button>
      </div>
    );
  }
}

export default connect(null, (dispatch) => {
  return {
    setCart: (item) => {
      dispatch(createLineItem(item));
    },
  };
})(AddToCart);
