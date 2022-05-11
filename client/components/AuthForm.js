import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { GoogleLogin } from "react-google-login";
import { useState } from "react";

require('dotenv').config()
const googlePW = process.env.STRIPE_PRIVATE_KEY

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, authenticateGoogle, error } = props;

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = async (googleData) => {
    console.log(googleData);
    const res = await fetch("/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    authenticateGoogle(data.username, googlePW, "login");
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <h1> LOGIN WITH GOOGLE</h1>
      {loginData ? (
        <div>
          <h3>
            Welcome {loginData.given_name} {loginData.family_name}! You logged
            in as {loginData.email}
          </h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <GoogleLogin
          clientId={
            "662175514296-h4dm5bmcv28vvpcnenubrse9g470ccm7.apps.googleusercontent.com"
          }
          buttonText="Log in with GOOGLE"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
    authenticateGoogle: (username, password, formName) => {
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
