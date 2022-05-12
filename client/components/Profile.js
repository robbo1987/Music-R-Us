import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProfile } from "../store";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

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
  }

  onChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };

  saveProfile = (ev) => {
    ev.preventDefault();
    this.props.update(this.state);
  };

  render() {
    const { username, streetAddress, email, city, state, zip, phone } =
      this.state;
    const { saveProfile, onChange } = this;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="username"
              name="username"
              label="Username"
              value={username}
              onChange={onChange}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="streetAddress"
              name="streetAddress"
              label="Street Address"
              value={streetAddress}
              onChange={onChange}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="city"
              name="city"
              value={city}
              onChange={onChange}
              label="City"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              value={state}
              onChange={onChange}
              label="State/Province/Region"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="zip"
              name="zip"
              value={zip}
              onChange={onChange}
              label="Zip / Postal code"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              label="E-mail"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phone"
              name="phone"
              value={phone}
              onChange={onChange}
              label="Phone Number"
              fullWidth
              variant="standard"
            />
          </Grid>
        </Grid>
        <button
          onClick={saveProfile}
          style={{ padding: "5px", margin: "10px" }}
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
      </React.Fragment>
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
