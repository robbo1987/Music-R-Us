import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProfile } from "../store";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.auth.username ? this.props.auth.username : "",
      streetAddress: this.props.auth.streetAddress
        ? this.props.auth.streetAddress
        : "",
      email: this.props.auth.email ? this.props.auth.email : "",
      city: this.props.auth.city ? this.props.auth.city : "",
      state: this.props.auth.state ? this.props.auth.state : "",
      zip: this.props.auth.zip ? this.props.auth.zip : "",
      phone: this.props.auth.phone ? this.props.auth.phone : "",
    };

    this.saveProfile = this.saveProfile.bind(this);
  }
  saveProfile(ev) {
    ev.preventDefault();
    this.props.update(this.state);
  }

  render() {
    const { username, streetAddress, email, city, state, zip, phone } =
      this.state;
    const { saveProfile } = this;
    return (
      <div>
        <h1>Profile</h1>
        <form onSubmit={saveProfile}>
          <label>Username:</label>
          <input
            name="username"
            value={username}
            onChange={(ev) => this.setState({ username: ev.target.value })}
          ></input>

          <label>Address:</label>
          <input
            name="streetAddress"
            value={streetAddress}
            onChange={(ev) => this.setState({ streetAddress: ev.target.value })}
          ></input>
          <label>City:</label>
          <input
            name="city"
            value={city}
            onChange={(ev) => this.setState({ city: ev.target.value })}
          ></input>
          <label>State:</label>
          <input
            name="state"
            value={state}
            onChange={(ev) => this.setState({ state: ev.target.value })}
          ></input>
          <label>Zip:</label>
          <input
            name="zip"
            type="number"
            value={zip}
            onChange={(ev) => this.setState({ zip: ev.target.value })}
          ></input>
          <label>Phone:</label>
          <input
            name="phone"
            value={phone}
            onChange={(ev) => this.setState({ phone: ev.target.value })}
          ></input>
          <label>Email:</label>
          <input
            name="email"
            value={email}
            onChange={(ev) => this.setState({ email: ev.target.value })}
          ></input>

          <button
            disabled={
              username === this.props.auth.username &&
              streetAddress === (this.props.auth.streetAddress || "") &&
              email === (this.props.auth.email || "") &&
              city === (this.props.auth.city || "") &&
              state === (this.props.auth.city || "") &&
              zip === (this.props.auth.zip || "") &&
              phone === (this.props.auth.phone || "")
            }
          >
            Update
          </button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    update: (user) => {
      dispatch(updateProfile(user));
    },
  };
};

export default connect(mapState, mapDispatch)(Profile);
