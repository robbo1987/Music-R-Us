import React from "react";
import { connect } from "react-redux";
import { createLineItem, updateLineitem } from "../store";

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
    };
  }

  render() {
    const { quantity } = this.state;
    const { setCart, instrument, lineitems, orderId, updateLineitem } =
      this.props;
    const item = { quantity, orderId, instrumentId: instrument.id };
    const lineitem = lineitems.find(
      (lineitem) =>
        lineitem.orderId === orderId && lineitem.instrumentId === instrument.id
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

    return (
      <div>
        <form onSubmit={Submit}>
          <input
            type="number"
            name="quantity"
            min="0"
            value={quantity}
            onChange={Change}
          />
          <button disabled={quantity == 0}> Add to Cart </button>
        </form>
      </div>
    );
  }
}

const mapState = ({ auth, orders, lineitems }) => {
  const cart = orders.find((order) => order.userId === auth.id && order.isCart);
  return {
    orderId: cart?.id,
    lineitems,
  };
};

export default connect(mapState, (dispatch) => {
  return {
    setCart: (item) => {
      dispatch(createLineItem(item));
    },
    updateLineitem: (item) => {
      dispatch(updateLineitem(item));
    },
  };
})(AddToCart);
