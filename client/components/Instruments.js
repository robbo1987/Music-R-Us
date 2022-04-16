import React from "react";
import { connect } from "react-redux";

export const Instruments = ({instruments}) => {
  
  return (
    <div>
      {instruments.map(instrument =>{
        return (<div key= {instrument.id}> 
          {instrument.name}
        </div>)
      })}
    </div>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Instruments);