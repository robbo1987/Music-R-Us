import * as React from "react";
import { connect } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Row from "./Orders-rows";

const Orders = ({ orders }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Purchaser name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Order Id</TableCell>
            <TableCell align="right">Order Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <Row key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapState = ({ orders, lineitems, instruments, auth }) => {
  if (auth.isAdmin) {
    orders = orders.filter((order) => order.userId === auth.id);
  }
  const ordersWithoutCart = orders.filter((order) => !order.isCart);

  return {
    orders: ordersWithoutCart,
    lineitems,
    instruments,
  };
};

export default connect(mapState)(Orders);
