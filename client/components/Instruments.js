import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Instruments = ({
  instruments,
  brands,
  categories,
  history,
  match,
}) => {
  return (
    <div>
      <select
        value={match.params.sort}
        name="sort"
        onChange={(ev) =>
          history.push(
            ev.target.value
              ? `/instruments/sort/${ev.target.value}`
              : "/instruments"
          )
        }
      >
        <option value=""> Sort By </option>
        <option value="AscName">Sort Ascending By Name</option>
        <option value="DescName">Sort Decending By Name</option>
        <option value="AscPrice">Sort Ascending By Price</option>
        <option value="DescPrice">Sort Descending By Price</option>
      </select>

      <div>
        <ul>
          {instruments.map((instrument) => {
            const brand = brands.find(
              (brand) => brand.id === instrument.brandId
            );
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
                <img
                  id="detailPage"
                  src={`/public/photos/${instrument.image}`}
                />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    brands: state.brands,
    categories: state.categories,
    instruments: state.instruments,
  };
};
export default connect(mapState)(Instruments);
