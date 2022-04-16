import React from "react";
import { connect } from "react-redux";

export const Brands = ({brands}) => {
  
  return (
    <div>
      {brands.map(brand =>{
        return (<div key= {brand.id}> 
          {brand.name}
        </div>)
      })}
    </div>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Brands);