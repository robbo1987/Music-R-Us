import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteInstrument } from "../store";

class UpdateInstruments extends Component {
  constructor() {
    super();
  }
  render() {
    const { instruments, deleteInstrument } = this.props;
    return (
      <>
        <table>
          <tbody>
            <tr>
              <th> Remove Instrument </th>
              <th> Instrument Name </th>
              <th> Instrument Price </th>
              <th> Instrument Inventory </th>
            </tr>
            {instruments.map((instrument) => {
              return (
                <tr key={instrument.id}>
                  <th>
                    <button onClick={() => deleteInstrument(instrument.id)}>
                      X
                    </button>
                  </th>
                  <th>{instrument.name}</th>
                  <th>{instrument.price}</th>
                  <th>{instrument.inventory}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}
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
