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
import Pagination from "@mui/material/Pagination";

class AllOrders extends React.Component {
  constructor() {
    super();
    this.state = {
      sortValue: "",
      filterValue: "",
      currentPage: 1,
      ordersPerPage: 10,
    };
  }

  SortChange = (ev) => {
    this.setState({
      sortValue: ev.target.value,
    });
  };

  FilterChange = (ev) => {
    this.setState({
      filterValue: ev.target.value,
    });
  };

  SortOrders = (sortValue, orders) => {
    const total = (order) => {
      return order.lineitems.reduce((acc, item) => {
        return acc + item.quantity * item.instrument.price;
      }, 0);
    };

    if (sortValue === "name_asc") {
      orders.sort((a, b) => a.user.username.localeCompare(b.user.username));
    }
    if (sortValue === "name_des") {
      orders.sort((a, b) => b.user.username.localeCompare(a.user.username));
    }
    if (sortValue === "total_asc") {
      orders.sort((a, b) => total(a) - total(b));
    }
    if (sortValue === "total_des") {
      orders.sort((a, b) => total(b) - total(a));
    }
    return orders;
  };

  FilterOrders = (filterValue, orders) => {
    return orders.filter((order) =>
      order.user.username.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  render() {
    const { sortValue, filterValue, currentPage, ordersPerPage } = this.state;
    const { SortChange, FilterChange, SortOrders, FilterOrders } = this;
    let orders = SortOrders(sortValue, this.props.orders);
    orders = FilterOrders(filterValue, orders);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    return (
      <>
        <select name="sort" value={sortValue} onChange={SortChange}>
          <option value="">Sort Orders</option>
          <option value="name_asc"> Name ↑</option>
          <option value="name_des"> Name ↓</option>
          <option value="total_asc"> Total ↑</option>
          <option value="total_des"> Total ↓</option>
        </select>
        <input
          placeholder="search"
          value={filterValue}
          name="Search by username"
          onChange={FilterChange}
        />
        {!orders.length ? (
          <h2>No orders for that search</h2>
        ) : (
          <>
            <Pagination
              count={Math.ceil(orders.length / ordersPerPage)}
              color="primary"
              onChange={(ev, page) => this.setState({ currentPage: page })}
            />

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
                  {currentOrders.map((order) => (
                    <Row key={order.id} order={order} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </>
    );
  }
}

const mapState = ({ orders }) => {
  const allOrders = orders.filter((orders) => orders.lineitems?.length);
  return {
    orders: allOrders,
  };
};

export default connect(mapState)(AllOrders);
