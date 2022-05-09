import * as React from "react";
import { connect } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Row from "./AllOrders-rows";

const AllOrders = ({ orders }) => {
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

const mapState = ({ orders }) => {
  const allOrders = orders.filter((orders) => orders.lineitems?.length);
  return {
    orders: allOrders,
  };
};

export default connect(mapState)(AllOrders);
