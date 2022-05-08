import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import {
  me,
  setCategories,
  setBrands,
  setInstruments,
  setOrders,
  setLineitem,
  setUsers,
  setAllOrders,
} from "./store";
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
import UpdateInstruments from "./components/UpdateInstruments";
import AllUsersAdmin from "./components/AllUsers-Admin";
import AllOrdersAdmin from "./components/AllOrders-Admin";

class Routes extends Component {
  componentDidMount() {
    const cart = window.localStorage.getItem("cart");
    if (!cart)
      window.localStorage.setItem("cart", JSON.stringify({ lineitems: [] }));

    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/profile" exact component={Profile} />
            {isAdmin && (
              <Switch>
                <Route
                  path="/AdminControl/updateinstruments"
                  component={UpdateInstruments}
                />
                <Route
                  path="/AdminControl/allusers"
                  component={AllUsersAdmin}
                />
                <Route
                  path="/AdminControl/allorders"
                  component={AllOrdersAdmin}
                />
              </Switch>
            )}
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
        <Switch>
          <Route path="/categories/:id" exact component={Category} />
          <Route path="/categories" exact component={Categories} />
          <Route path="/brands/:id" exact component={Brand} />
          <Route path="/brands" exact component={Brands} />
          <Route path="/instruments/sort/:sort" component={Instruments} />
          <Route path="/instruments/:id" exact component={SelectedInstrument} />
          <Route path="/instruments" component={Instruments} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/checkoutpage" exact component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
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

    adminLoad() {
      dispatch(setUsers());
      dispatch(setAllOrders());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
