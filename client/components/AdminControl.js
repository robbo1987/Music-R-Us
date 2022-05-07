import React from "react";
import { connect } from "react-redux";
import history from "../history";

const AdminControl = () => {
  const change = (ev) => {
    if (ev.target.value) {
      history.push(`/AdminControl/${ev.target.value}`);
    }
  };
  return (
    <>
      <select onChange={change}>
        <option value="">AdminControl</option>
        <option value="updateinstruments">Update Instruments</option>
        <option value="allorders">See All Orders</option>
        <option value="allusers">See All Users</option>
      </select>
    </>
  );
};

export default connect((state) => state)(AdminControl);
