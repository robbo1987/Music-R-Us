import React from "react";
import { connect } from "react-redux";
import { createLineItem, updateLineitem, updateInventory } from "../store";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
    };
  }

  render() {
    const { quantity } = this.state;
    const {
      createLineItem,
      instrument,
      lineitems,
      orderId,
      updateLineitem,
      updateInventory,
    } = this.props;

    const item = {
      quantity: quantity * 1,
      orderId: orderId ? orderId : null,
      instrumentId: instrument.id,
    };

    const updatedInventory = {
      instrumentId: instrument.id,
      inventory: instrument.inventory - quantity * 1,
    };

    let lineitem;
    if (orderId) {
      lineitem = lineitems.find(
        (lineitem) =>
          lineitem.orderId === orderId &&
          lineitem.instrumentId === instrument.id
      );
    } else {
      lineitem = lineitems.find(
        (lineitem) => lineitem.instrumentId === instrument.id
      );
    }

    const Change = (ev) => {
      this.setState({
        [ev.target.name]: ev.target.value,
      });
    };
    const Submit = (ev) => {
      ev.preventDefault();

      console.log(updatedInventory);

      updateInventory(updatedInventory);

      if (!lineitem) createLineItem(item);
      else {
        updateLineitem({
          ...lineitem,
          quantity: quantity * 1 + lineitem?.quantity,
        });
      }
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="success">
          `${quantity} ${instrument.name} added to cart!`
        </Alert>
      </Stack>;

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
    createLineItem: (item) => {
      dispatch(createLineItem(item));
    },
    updateLineitem: (item) => {
      dispatch(updateLineitem(item));
    },
    updateInventory: (instrument) => {
      dispatch(updateInventory(instrument));
    },
  };
})(AddToCart);
