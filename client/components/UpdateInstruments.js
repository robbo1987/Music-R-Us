import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import { deleteInstrument } from "../store";

const UpdateInstruments = (props) => {
  const { instruments, deleteInstrument } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Instrument Name</TableCell>
            <TableCell align="right">Instrument Price</TableCell>
            <TableCell align="right">Instrument Inventory</TableCell>
            <TableCell align="right">Remove Instrument</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instruments.map((instrument) => (
            <TableRow
              key={instrument.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {instrument.name}
              </TableCell>
              <TableCell align="right">{`$${instrument.price}`}</TableCell>
              <TableCell align="right">{instrument.inventory}</TableCell>
              <TableCell align="right">
                <button onClick={() => deleteInstrument(instrument.id)}>
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

const mapState = ({ instruments }) => {
  return {
    instruments,
  };
};
const mapDispatch = (dispatch) => {
  return {
    deleteInstrument: (id) => {
      dispatch(deleteInstrument(id));
    },
  };
};

export default connect(mapState, mapDispatch)(UpdateInstruments);
