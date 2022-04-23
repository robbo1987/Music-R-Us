import React from "react";
import { connect } from "react-redux";
import {createLineItem} from "../store"

class AddToCart extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 100,
      orderId: 10,
      instrumentId: 10,
    };
  }

  render() {
    
    return (
      <div>
        <button
          onClick={() => {
            
            this.props.setCart( 
              this.state.quantity,
              this.state.orderId,
              this.state.instrumentId
            );
          }}
        >
          
          Add to Cart
        </button>
        console.log(this.state, "state")
      </div>
    );
  }
}

export default connect(null, (dispatch) => {
  return {
    setCart: (quantity,orderId,instrumentId) => {
      dispatch(createLineItem(quantity,orderId,instrumentId));
    },
  };
})(AddToCart);
