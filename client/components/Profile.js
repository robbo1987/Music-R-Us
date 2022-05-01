import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProfile } from "../store";

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      username: this.props.auth.username,
      address: this.props.auth.address,
    };
    this.onChange = this.onChange.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
  }
  saveProfile(ev) {
    ev.preventDefault();
    this.props.update(this.state.username);
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render() {
    const { username, address } = this.state;
    const { onChange, saveProfile } = this;
    return (
      <div>
        <h1>Profile</h1>
        <form onSubmit={saveProfile}>
          <label>Username:</label>
          <input name="username" value={username} onChange={onChange}></input>

          <label>Address:</label>
          <input name="address" value={address} onChange={onChange}></input>

          <button
            disabled={
              username === this.props.auth.username &&
              address === this.props.auth.address
            }
          >
            Save
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
    update: (username) => {
      dispatch(updateProfile(username));
    },
  };
};

export default connect(mapState, mapDispatch)(Profile);
