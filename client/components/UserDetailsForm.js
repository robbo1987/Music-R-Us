import React, { Component } from "react";
import { connect } from "react-redux";

class UserDetailsForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      phone: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.sameAsUser = this.sameAsUser.bind(this);
  }
  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }
  async onSave(ev) {
    ev.preventDefault();
    //const user = this.state;
  }

  sameAsUser() {
    const { user } = this.props;
    this.setState({
      name: user.username,
      address: user.streetAddress,
      city: user.city,
      state: user.state,
      zip: user.zip,
      email: user.email,
      phone: user.phone,
    });
  }
  render() {
    const { name, address, city, state, zip, email, phone } = this.state;
    const { onChange, sameAsUser, onSave } = this;
    return (
      <div>
        <h1>Shipping Info</h1>
        <button onClick={sameAsUser}>Same As User</button>
        <form onSubmit={onSave}>
          <label htmlFor="name">Name:</label>
          <input name="name" value={name} onChange={onChange} />
          <div className="side-by-side">
            <label htmlFor="address">Street Address:</label>
            <input name="address" value={address} onChange={onChange} />
            <label htmlFor="city">City:</label>
            <input name="city" value={city} onChange={onChange} />
          </div>
          <div className="side-by-side">
            <label htmlFor="state">State:</label>
            <input name="state" value={state} onChange={onChange} />
            <label htmlFor="zip">Zip:</label>
            <input name="zip" value={zip} onChange={onChange} />
          </div>
          <div className="side-by-side">
            <label htmlFor="email">Email:</label>
            <input name="email" value={email} onChange={onChange} />
            <label htmlFor="phone">Phone:</label>
            <input name="phone" value={phone} onChange={onChange} />
          </div>

          <button>save</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState, null)(UserDetailsForm);
