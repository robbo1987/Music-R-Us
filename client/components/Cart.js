import React, { Component } from "react";
import { connect } from "react-redux";
import { updateOrder, updateLineitem } from "../store";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart
        ? { ...this.props.cart, cartItems: [...this.props.cartItems] }
        : {},
    };
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.cart && this.props.cart) {
      this.setState({
        cart: { ...this.props.cart, cartItems: [...this.props.cartItems] },
      });
    }
  }

  render() {
    const {
      cart: { cartItems },
    } = this.state;
    const { updateOrder, updateLineitem } = this.props;

    const Checkout = () => {
      const order = { ...this.state.cart };
      updateOrder(order);
      order.cartItems.forEach((item) => {
        updateLineitem(item);
      });
    };

    if (!cartItems?.length) return <h1>Nothing in Cart</h1>;

    return (
      <div>
        <ul>
          {cartItems.map((item) => {
            return (
              <li key={item.id}>
                {`Instrument: ${item.instrument.name}`}
                <br></br>
                {`Quantity: ${item.quantity}`}
                <br></br>
                {`Subtotal: $${item.quantity * item.instrument.price}`}
              </li>
            );
          })}
        </ul>
        <button onClick={Checkout}> Checkout </button>
      </div>
    );
  }
}

const mapState = ({ orders, lineitems, instruments, auth }) => {
  const cart = orders.find((order) => order.userId === auth.id && order.isCart);
  const cartItems = lineitems
    .filter((item) => item.orderId === cart?.id)
    .map((item) => {
      const instrument = instruments.find(
        (instrument) => instrument.id === item.instrumentId
      );
      return { ...item, instrument };
    });
  return {
    cart,
    cartItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateOrder: (order) => {
      dispatch(updateOrder(order));
    },
    updateLineitem: (lineitem) => {
      dispatch(updateLineitem(lineitem));
    },
  };
};

export default connect(mapState, mapDispatch)(Cart);
