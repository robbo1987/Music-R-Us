import React, { Component } from "react";
import { connect } from "react-redux";
import { banUser } from "../store";

class AllUsers extends Component {
  constructor() {
    super();
  }
  render() {
    const { users, banUser } = this.props;
    return (
      <>
        <table>
          <tbody>
            <tr>
              <th> User Name </th>
              <th> User Email </th>
              <th> Admin? </th>
              <th> Banned? </th>
              <th> Ban/Unban </th>
            </tr>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <th>{user.username}</th>
                  <th>{user.email}</th>
                  <th>{user.isAdmin ? "Yes" : "No"}</th>
                  <th>{user.isBanned ? "Yes" : "No"} </th>
                  <th>
                    <button
                      onClick={() => {
                        if (user.isAdmin)
                          window.alert(
                            `${user.username} is an Admin and can't be banned!`
                          );
                        else banUser(user.id);
                      }}
                    >
                      X
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}
const mapState = ({ users }) => {
  return {
    users,
  };
};
const mapDispatch = (dispatch) => {
  return {
    banUser: (id) => {
      dispatch(banUser(id));
    },
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
