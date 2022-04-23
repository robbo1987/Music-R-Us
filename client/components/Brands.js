import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Brands = ({ brands }) => {
  return (
    <div className="brandLink">
      {brands.map((brand) => {
        return (
          <Link key={brand.id} to={`/brands/${brand.id}`}>
            {brand.name}
          </Link>
        );
      })}
    </div>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Brands);
