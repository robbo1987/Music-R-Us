import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Category = ({ instruments, brands, category }) => {
  const instrumentsList =
    instruments.filter((instrument) => instrument.categoryId === category.id) ||
    {};
  return (
    <div>
      <h1>{`List of ${category.name}'s in our Store`}</h1>
      <ul>
        {instrumentsList.map((instrument) => {
          const brand = brands.find((brand) => brand.id === instrument.brandId);
          return (
            <div key={instrument.id}>
              <div>
                <img id="detailPage" src={`/public/${instrument.image}`} />
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
  const category =
    categories.find(
      (category) => category.id === otherProps.match.params.id * 1
    ) || {};
  return { instruments, brands, category };
};

export default connect(mapState)(Category);
