import React, { Component } from "react";
import { connect } from "react-redux";
import { setInstruments } from "../store/instruments";

class Pagination extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      pageNumber: 1,
      itemsPerPage: 6,
    };
    console.log(this.state);

    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidUpdate(_, prevState) {
    if (prevState.pageNumber !== this.state.pageNumber) {
      this.props.setInstruments(this.state.pageNumber, this.state.itemsPerPage);
    }
  }
  prevPage = () => {
    if (this.state.pageNumber === 1) return;
    this.setState({ pageNumber: this.state.pageNumber - 1 });
  };

  nextPage = () => {
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  };

  render() {
    const { pageNumber } = this.state;
    const { prevPage, nextPage } = this;
    return (
      <div className="pagination">
        <button onClick={prevPage}>{"<"}</button>
        <p>{pageNumber}</p>
        <button onClick={nextPage}>{">"}</button>
      </div>
    );
  }
}

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
