import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Instruments = ({ instruments, brands, categories }) => {
  return (
    <div>
      <label for="sort">Sort by:</label>
      <select name ='Sort'>
       <option value="Ascending by Name">Ascending by Name</option>
       <option value="Descending by Name">Descending by Name</option>
       <option value="Ascending by Price">Ascending by Price</option>
       <option value="Descending by Price">Descending by Price</option>
      </select>
  
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
    </div>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Instruments);
