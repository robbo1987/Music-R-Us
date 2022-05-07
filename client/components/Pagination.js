import React, { Component } from "react";
import { connect } from "react-redux";
import { setInstruments } from "../store/instruments";

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      pageNumber: 1,
      itemsPerPage: 10,
      instruments: this.props.instruments,
    };
    console.log(this.state);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  // componentDidUpdate(_, prevState) {
  //   if (prevState.pageNumber !== this.state.pageNumber) {
  //     this.props.setInstruments(this.state.pageNumber, this.state.itemsPerPage);
  //   }
  // }
  previousPage = () => {
    if (this.state.pageNumber === 1) return;
    this.setState({ pageNumber: this.state.pageNumber - 1 });
    this.props.setInstruments(this.state.pageNumber -1, this.state.itemsPerPage);
  };

  nextPage = () => {
    this.setState({ pageNumber: this.state.pageNumber + 1 });
    this.props.setInstruments(this.state.pageNumber + 1, this.state.itemsPerPage);
  };

  render() {
    const { pageNumber } = this.state;
    const { previousPage, nextPage } = this;
    return (
      <div className="pagination">
        <button onClick={previousPage}> {"<"} </button>
        <p>{pageNumber}</p>
        <button onClick={nextPage}> {">"} </button>
      </div>
    );
  }
}

//destructured instruments from state
const mapState = ({ instruments }) => {
  return { instruments };
};

const mapDispatch = (dispatch) => {
  return {
    setInstruments: (pageNumber, itemsPerPage) =>
      dispatch(setInstruments(pageNumber, itemsPerPage)),
  };
};

export default connect(mapState, mapDispatch)(Pagination);
