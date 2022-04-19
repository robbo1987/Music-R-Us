import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me, setCategories } from "./store";
import { setBrands, setInstruments } from "./store";
import Brands from "./components/Brands";
import Instruments from "./components/Instruments";
import Brand from "./components/Brand";
import LandingPage from "./components/LandingPage";
import Category from "./components/Category";
import SelectedInstrument from "./components/SelectedInstrument";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
        <Switch>
          <Route path="/landingpage" exact component={LandingPage} />
          <Route path="/brands" exact component={Brands} />
          <Route path="/instruments" exact component={Instruments} />
          <Route path="/categories/:id" exact component={Category} />
          <Route path="/brands/:id" exact component={Brand} />
          <Route path="/instruments/:id" exact component={SelectedInstrument} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(setBrands());
      dispatch(setInstruments());
      dispatch(setCategories());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
