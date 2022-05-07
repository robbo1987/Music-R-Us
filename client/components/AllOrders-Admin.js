import React, { Component } from "react";
import { connect } from "react-redux";

class AllOrders extends Component {
  constructor() {
    super();
  }
  render() {
    const { orders } = this.props;
    return (
      <>
        <ul>
          {orders
            .filter((order) => order.lineitems)
            .map((order) => {
              return (
                <li key={order.id}>
                  {order.lineitems.map((lineitem) => {
                    return (
                      <div key={lineitem.id}>
                        Name: {lineitem.instrument.name}
                        <br></br>
                        Quantity: {lineitem.quantity}
                        <br></br>
                        Price: {lineitem.instrument.price}
                      </div>
                    );
                  })}
                  Order Total:{" "}
                  {order.lineitems.reduce((acc, item) => {
                    return acc + item.quantity * item.instrument.price;
                  }, 0)}
                </li>
              );
            })}
        </ul>
      </>
    );
  }
}
const mapState = ({ orders }) => {
  return {
    orders,
  };
};
const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(AllOrders);
