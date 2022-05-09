import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

class Row extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }
  render() {
    const { open } = this.state;
    const { order, auth, lineitems, instruments } = this.props;

    const orderItems = lineitems.filter(
      (lineitem) => lineitem.orderId === order.id
    );

    const orderTotal = orderItems.reduce((acc, item) => {
      const instrument = instruments.find(
        (instrument) => instrument.id === item.instrumentId
      );
      return acc + item.quantity * instrument.price;
    }, 0);

    return (
      <Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => this.setState({ open: !open })}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {auth.username}
          </TableCell>
          <TableCell align="right">{auth.email}</TableCell>
          <TableCell align="right">{order.createdAt.slice(0, 10)}</TableCell>
          <TableCell align="right">{order.id}</TableCell>
          <TableCell align="right">{`$${orderTotal}`}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Purchased Items
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Instrument Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Unit Price</TableCell>
                      <TableCell align="right">Total price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderItems.map((item) => {
                      const instrument = instruments.find(
                        (instrument) => instrument.id === item.instrumentId
                      );
                      return (
                        <TableRow key={item.id}>
                          <TableCell component="th" scope="row">
                            {instrument.name}
                          </TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">
                            {`$${instrument.price}`}
                          </TableCell>
                          <TableCell align="right">
                            {`$${item.quantity * instrument.price}`}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }
}

const mapState = ({ lineitems, instruments, auth }) => {
  return {
    lineitems,
    instruments,
    auth,
  };
};

export default connect(mapState)(Row);
