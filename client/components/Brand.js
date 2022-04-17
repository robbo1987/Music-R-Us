import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom"

export const Brand = (props) => {
  const brand = props.brands.find(brand=>brand.id===props.match.params.id*1)
  console.log(brand)
  if(!brand) return null
  return (
    <div>
     <li>
       {brand.name}
     </li>
    </div>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Brand);