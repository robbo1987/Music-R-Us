import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

export const SelectedInstrument = ({ instrument, brand, category }) => {
  // orders.find(order => order.userId === logginUser.id && order.isCart)
  // lineitem ( instrument.id, order.id, quantity )

  return (
    <div>
      <ul>
        
        <li>
          {brand.name} {instrument.name}
        </li>
        < br />
        <li>Price: {`$ ${instrument.price} `}</li>
        <br />

        <li> Inventory: {instrument.inventory}</li>
        <br />
        <AddToCart instrument={instrument} />
       
        <br />
        Click to Return To
        <Link to={`/categories/${category.id}`}> {category.name}'s</Link>
        <div>
          <br />
          Click to Return To
          <Link to={`/brands/${brand.id}`}> {brand.name}</Link>
          <div></div>
          <br />
          <img id="detailPage" src={`/public/photos/${instrument.image}`} />
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
