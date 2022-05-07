import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

export const Instruments = ({ instruments, brands, categories }) => {
  return (
    <div>
      <ul>
        {instruments.map((instrument) => {
          const brand = brands.find((brand) => brand.id === instrument.brandId);
          const category =
            categories.find(
              (category) => category.id === instrument.categoryId
            ) || {};
          return (
            <div key={instrument.id}>
              <Link to="/brands/">{brand.name}</Link>-
              <Link to={`/instruments/${instrument.id}`}>
                {instrument.name}
              </Link>
              - {category.name}
              <img id="detailPage" src={`/public/photos/${instrument.image}`} />
            </div>
          );
        })}
      </ul>
      <Pagination />
    </div>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Instruments);
