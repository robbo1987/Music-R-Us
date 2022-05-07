import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardActionArea } from "@material-ui/core";

export const SelectedInstrument = ({ instrument, brand, category }) => {
  return (
    <Container>
      <Card>
        <ul>
          <li>
            {brand.name} {instrument.name}
          </li>
          <br />
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
            <CardMedia
              component="img"
              image={`/public/photos/${instrument.image}`}
            ></CardMedia>
          </div>
        </ul>
      </Card>
    </Container>
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
