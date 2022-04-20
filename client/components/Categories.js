import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Categories = ({ categories }) => {
  return (
    <div>
      {categories.map((category) => {
        return (
          <div key={category.id}>
            <Link to={`/categories/${category.id}`}>{category.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Categories);
