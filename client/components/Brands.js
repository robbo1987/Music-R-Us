import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Brands = ({ brands }) => {
  return (
    <div>
      {brands.map((brand) => {
        return (
          <div key={brand.id}>
            <Link to={`/brands/${brand.id}`}>{brand.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Brands);
