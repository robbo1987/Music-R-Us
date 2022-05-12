import * as React from "react";
import { connect } from "react-redux";
import { deleteInstrument, updateInstrument } from "../store";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

class UpdateInstrumentRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.instrument ? this.props.instrument.price : "",
      inventory: this.props.instrument ? this.props.instrument.inventory : "",
    };
  }

  onChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };

  render() {
    const { price, inventory } = this.state;
    const { onChange } = this;
    const { deleteInstrument, instrument, updateInstrument } = this.props;

    return (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" style={{ width: "250px" }}>
          {instrument.name}
        </TableCell>
        <TableCell align="right">
          <Grid item xs={12} sm={6}>
            <TextField
              id="price"
              name="price"
              value={price}
              onChange={onChange}
              fullWidth
              variant="standard"
            />
          </Grid>
        </TableCell>
        <TableCell align="right">
          <Grid item xs={12} sm={6}>
            <TextField
              id="inventory"
              name="inventory"
              value={inventory}
              onChange={onChange}
              fullWidth
              variant="standard"
            />
          </Grid>
        </TableCell>
        <TableCell align="right">
          <button
            onClick={() =>
              updateInstrument({
                ...instrument,
                price: price * 1,
                inventory: inventory * 1,
              })
            }
          >
            Update
          </button>
        </TableCell>
        <TableCell align="right">
          <button onClick={() => deleteInstrument(instrument.id)}>X</button>
        </TableCell>
      </TableRow>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteInstrument: (id) => {
      dispatch(deleteInstrument(id));
    },
    updateInstrument: (instrument) => {
      dispatch(updateInstrument(instrument));
    },
  };
};

export default connect(null, mapDispatch)(UpdateInstrumentRow);
