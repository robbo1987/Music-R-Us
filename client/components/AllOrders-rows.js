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
    const { order, users } = this.props;
    const user = users.find((user) => user.id === order.userId);

    const orderTotal = order.lineitems.reduce((acc, item) => {
      return acc + item.quantity * item.instrument.price;
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
            {user.username}
          </TableCell>
          <TableCell align="right">{user.email}</TableCell>
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
                    {order.lineitems.map((lineitem) => (
                      <TableRow key={lineitem.id}>
                        <TableCell component="th" scope="row">
                          {lineitem.instrument.name}
                        </TableCell>
                        <TableCell align="right">{lineitem.quantity}</TableCell>
                        <TableCell align="right">
                          {`$${lineitem.instrument.price}`}
                        </TableCell>
                        <TableCell align="right">
                          {`$${lineitem.quantity * lineitem.instrument.price}`}
                        </TableCell>
                      </TableRow>
                    ))}
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

const mapState = ({ users }) => {
  return {
    users,
  };
};

export default connect(mapState)(Row);
