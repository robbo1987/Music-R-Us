import React, { Component } from "react";
import { connect } from "react-redux";

class AllOrders extends Component {
  constructor() {
    super();
  }
  render() {
    console.log("test");
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
                        Subtotal:{" "}
                        {lineitem.instrument.price * lineitem.quantity}
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

export default connect(mapState)(AllOrders);
