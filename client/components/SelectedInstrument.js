import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const SelectedInstrument = ({ instrument, brand, category }) => {
  // orders.find(order => order.userId === logginUser.id && order.isCart)
  // lineitem ( instrument.id, order.id, quantity )
  return (
    <div>
      <ul>
        <div>
          <img id="detailPage" src={`/public/${instrument.image}`} />
        </div>
        <li>{instrument.name}</li>
        <li>{`$ ${instrument.price} `}</li>
        <Link to={`/categories/${category.id}`}>{category.name}</Link>
        <div>
          <Link to={`/brands/${brand.id}`}>{brand.name}</Link>
        </div>
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
