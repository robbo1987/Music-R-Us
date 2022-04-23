import React from "react";
import { connect } from "react-redux";

export const Orders = ({ orders, lineitems, instruments }) => {
  if (!orders.length) return <div>No Orders</div>;
  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order) => {
          return (
            <li key={order.id}>
              <div>
                <h2>Order ID: {order.id}</h2>
                {/* find the line items associated to order */}
                <ul>
                  {lineitems
                    .filter((lineitem) => {
                      return lineitem.orderId === order.id;
                      // map through the line items to see what the instruments are
                    })
                    .map((lineitem) => {
                      const instrument = instruments.find(
                        (instrument) => instrument.id === lineitem.instrumentId
                      );
                      return (
                        <li key={lineitem.id}>
                          name: {instrument?.name}
                          <br></br>
                          quantity: {lineitem.quantity}
                          <br></br>
                          price: {instrument?.price * lineitem.quantity}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapState = ({ orders, lineitems, instruments }) => {
  const ordersWithoutCart = orders.filter((order) => !order.isCart);

  return {
    orders: ordersWithoutCart,
    lineitems,
    instruments,
  };
};

export default connect(mapState)(Orders);
