import React from "react";
import { connect } from "react-redux";
import { createLineItem } from "../store";

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      orderId: this.props.orderId ? this.props.orderId : NaN,
      instrumentId: this.props.instrument.id ? this.props.instrument.id : "",
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.instrument.id && this.props.instrument.id) {
      this.setState({
        instrumentId: this.props.instrument.id,
      });
    }
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

const mapState = ({ auth, orders }) => {
  const cart = orders.find((order) => order.userId === auth.id && order.isCart);
  console.log(cart);
  return {
    orderId: cart?.id,
  };
};

export default connect(mapState, (dispatch) => {
  return {
    setCart: (item) => {
      dispatch(createLineItem(item));
    },
  };
})(AddToCart);
