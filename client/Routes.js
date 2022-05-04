import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me, setCategories } from "./store";
import { setBrands, setInstruments, setOrders, setLineitem } from "./store";
import Brands from "./components/Brands";
import Instruments from "./components/Instruments";
import Brand from "./components/Brand";
import Categories from "./components/Categories";
import Category from "./components/Category";
import SelectedInstrument from "./components/SelectedInstrument";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import CheckoutPage from "./components/CheckoutPage";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    const cart = window.localStorage.getItem("cart");
    if (!cart)
      window.localStorage.setItem("cart", JSON.stringify({ lineitems: [] }));

    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/profile" exact component={Profile} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
        <Switch>
          <Route path="/categories" exact component={Categories} />
          <Route path="/brands" exact component={Brands} />
          <Route path="/instruments" exact component={Instruments} />
          <Route path="/categories/:id" exact component={Category} />
          <Route path="/brands/:id" exact component={Brand} />
          <Route path="/instruments/:id" exact component={SelectedInstrument} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/checkoutpage" exact component={CheckoutPage} />
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
      dispatch(setOrders());
      dispatch(setBrands());
      dispatch(setInstruments());
      dispatch(setCategories());
      dispatch(setLineitem());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
