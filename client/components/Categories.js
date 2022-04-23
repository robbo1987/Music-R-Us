import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Categories = ({ categories }) => {
  return (
    <div className="ctgyLink">
      {categories.map((category) => {
        return (
          <Link key={category.id} to={`/categories/${category.id}`}>
            {category.name}
          </Link>
        );
      })}
    </div>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Categories);
