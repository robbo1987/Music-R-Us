import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const SelectedInstrument = ({ instrument, brand, category }) => {
  return (
    <div>
      <ul>
        <div>
          <h1>{brand.name} {instrument.name}</h1>
          <img id="singlePage" src={`/public/photos/${instrument.image}`} />
        </div>
       
       <h2> Price: $ {instrument.price} </h2>
       <h2>Description: {instrument.description}</h2>
        <Link to={`/categories/${category.id}`}>{category.name}</Link>
        <div>
          <Link to={`/brands/${brand.id}`}>{brand.name}</Link>
        </div>
        <button>Add To Cart</button>
      </ul>
    </div>
  );
};

const mapState = ({ instruments, brands, categories }, otherProps) => {
  const instrument =
    instruments.find(
      (instrument) => instrument.id === otherProps.match.params.id * 1
    ) || {};
  const category =
    categories.find((category) => category.id === instrument.categoryId) || {};
  const brand = brands.find((brand) => brand.id === instrument.brandId) || {};
  return { instrument, brand, category };
};

export default connect(mapState)(SelectedInstrument);
