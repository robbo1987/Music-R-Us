import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import { banUser } from "../store";

const AllUsers = (props) => {
  const { users, banUser } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell align="right">User Email</TableCell>
            <TableCell align="right">User Since</TableCell>
            <TableCell align="right">Admin?</TableCell>
            <TableCell align="right">Banned?</TableCell>
            <TableCell align="right">Ban/Unban</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.username}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.createdAt.slice(0, 10)}</TableCell>
              <TableCell align="right">{user.isAdmin ? "Yes" : "No"}</TableCell>
              <TableCell align="right">
                {user.isBanned ? "Yes" : "No"}
              </TableCell>
              <TableCell align="right">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

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
