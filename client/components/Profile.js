import React, { Component } from "react";
import { connect } from "react-redux";
//import { updateProfile } from ""

export class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      username: this.props.user ? this.props.user.username : "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  saveProfile(ev) {
    ev.preventDefault();
    this.props.update(this.props.user.id, username);
  }

  render() {
    const { username } = this.state;
    console.log(username);
    const { onChange, saveProfile } = this;

    return (
      <div>
        <h4>Profile</h4>
        <form onSubmit={saveProfile}>
          <label>Username:</label>
          <input name="username" value={username} onChange={onChange}></input>
          <button>Save</button>
        </form>
      </div>
    );
  }
}

const mapState = ({ auth, users }) => {
  // const token = window.localStorage.getItem("token");
  const user = users.find((user) => user.id === auth.id);
  return {
    
    user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    update: (id, username) => {
      dispatch(updateProfile(id, username));
    },
  };
};

export default connect(mapState, mapDispatch)(Profile);
