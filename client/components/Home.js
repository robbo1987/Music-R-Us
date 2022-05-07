import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  
  const { username, email, city, state, zip, streetAddress, phone } = props;

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <h3>Your email address is {email}</h3>
      <h3>
        Your Address is {streetAddress} {city} {state} {zip}
      </h3>
      <h3>Your phone number is {phone}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    email: state.auth.email,
    zip: state.auth.zip,
    city: state.auth.city,
    state: state.auth.state,
    streetAddress: state.auth.streetAddress,
    phone: state.auth.phone,
  };
};

export default connect(mapState)(Home);
