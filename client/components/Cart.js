import React, { Component } from "react";
import { connect } from "react-redux";
import { updateOrder, updateLineitem, deleteLineitem } from "../store";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // if this.props.cart exists, set cart to it with cartItems key else set to {}
      /* this.state.cart looks like this 
        {
          id: it's own id,
          isCart: true,
          userId: auth.id (logged in user id)
          cartItems: [this.props.cartitems] --- an array of the cart items passed in the mapState
        }
      */
      cart: this.props.cart
        ? { ...this.props.cart, cartItems: [...this.props.cartItems] }
        : {},
    };
  }
  componentDidUpdate(prevProps) {
    // if prevProps doesn't have cart and this.props.cart exists, set cart to it with cartItems key --- this way it only sets once and doesn't cause an infinite loop
    if (!prevProps.cart && this.props.cart) {
      this.setState({
        cart: { ...this.props.cart, cartItems: [...this.props.cartItems] },
      });
    }
  }

  render() {
    const { cart } = this.state;
    const cartItems = cart.cartItems;
    const { updateOrder, updateLineitem, deleteLineitem } = this.props;

    const Checkout = () => {
      const order = { ...cart };
      updateOrder(order);
      order.cartItems.forEach((item) => {
        updateLineitem(item);
      });
    };

    const Decrease = (item) => {
      if (item.quantity >= 1) {
        item.quantity--;
      }
      this.setState({});
    };

    const Increase = (item) => {
      item.quantity++;
      this.setState({});
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
                {`Quantity:`} <button onClick={() => Decrease(item)}>-</button>
                {` ${item.quantity} `}{" "}
                <button onClick={() => Increase(item)}>+</button>
                <br></br>
                {`Subtotal: $${item.quantity * item.instrument.price}`}
                <button onClick={() => deleteLineitem(item)}>Remove</button>
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
  // search through the logged in User's orders to find the one that is the cart
  if (lineitems.length && instruments.length) {
    const cart = orders.find(
      (order) => order.userId === auth.id && order.isCart
    );
    // find all of the cart items associated with the cart and attach and instrument key to them
    /* cartItem looks like this 
    {
      id: it's own id
      orderId: cart.id
      instrumentId: some instrument.id,
      quantity: some number,
      instrument: {
        the details of the instrument associated with the cartItem
      }
    }
    */
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
  }
  return {};
};
const mapDispatch = (dispatch) => {
  return {
    updateOrder: (order) => {
      dispatch(updateOrder(order));
    },
    updateLineitem: (lineitem) => {
      dispatch(updateLineitem(lineitem));
    },
    deleteLineitem: (item) => {
      dispatch(deleteLineitem(item));
    },
  };
};

export default connect(mapState, mapDispatch)(Cart);
