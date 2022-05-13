import React, { Component } from "react";
import {connect} from 'react-redux'
import {Pagination} from "@mui/material"

const pageSize = 6;

class AppPagination extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      instruments: []
    }
  }
  render() {
    
    return (
      <div className="pagination" style= {{display: "flex", justifyContent: "center"}}> 
       <Pagination count = {5}/>
      </div>
    );
  }
}

const mapState = ({instruments}) => {
  return {instruments}
}
export default connect(mapState)(AppPagination);
