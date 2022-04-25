import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Brand = ({ instruments, brand, categories }) => {
  const instrumentsList = instruments.filter(
    (instrument) => instrument.brandId === brand.id
  );
  if (!brand) return null;
  return (
    <div>
      <h1>{brand.name} Instruments</h1>
      <ul>
        {instrumentsList.map((instrument) => {
          return (
            <div key={instrument.id}>
              <div>
                <img
                  id="detailPage"
                  src={`/public/photos/${instrument.image}`}
                />
              </div>
              <div>
                <Link to={`/instruments/${instrument.id}`}>
                  {instrument.name}
                </Link>
              </div>
              <div>
                <Link to={`/brands/${brand.id}`}>{brand.name}</Link>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

const mapState = ({ instruments, brands, categories }, otherProps) => {
  const brand =
    brands.find((brand) => brand.id === otherProps.match.params.id * 1) || {};
  return { instruments, brand, categories };
};

export default connect(mapState)(Brand);
