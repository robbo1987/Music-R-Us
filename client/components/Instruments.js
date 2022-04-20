import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Instruments = ({ instruments, brands }) => {
  return (
    <div>
      <ul>
        {instruments.map((instrument) => {
          console.log(instrument.image);
          const brand = brands.find((brand) => brand.id === instrument.brandId);
          return (
            <div key={instrument.id}>
              <Link to="/brands/">{brand.name}</Link>-
              <Link to={`/instruments/${instrument.id}`}>
                {instrument.name}
              </Link>
              -{instrument.category}
              <img id="detailPage" src={`/public/photos/${instrument.image}`} />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Instruments);
