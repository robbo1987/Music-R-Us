import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProfile } from "../store";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.auth.username,
      streetAddress: this.props.auth.streetAddress,
      email: this.props.auth.email
    };
   
    this.saveProfile = this.saveProfile.bind(this);
  }
  saveProfile(ev) {
    ev.preventDefault();
    this.props.update(this.state);
  }



  render() {
    const { username, streetAddress,email } = this.state;
    const { saveProfile } = this;
    return (
      <div>
        <h1>Profile</h1>
        <form onSubmit={saveProfile}>
          <label>Username:</label>
          <input name="username" value={username} onChange={ev => this.setState({username : ev.target.value})}></input>

          <label>Address:</label>
          <input name="streetAddress" value={streetAddress} onChange={ev => this.setState({streetAddress : ev.target.value})}></input>
          <label>Email:</label>
          <input name="email" value={email} onChange={ev => this.setState({email : ev.target.value})}></input>


          <button
            disabled={
              username === this.props.auth.username
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
    update: (user) => {
      dispatch(updateProfile(user));
    }
  };
};

export default connect(mapState, mapDispatch)(Profile);
