import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";

export const Brands = ({ brands }) => {
  return (
    <Container>
      <Grid
        container
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
      >
        {brands.map((brand) => {
          return (
            <Link key={brand.id} to={`/brands/${brand.id}`}>
              <Card>
                <Typography>{brand.name}</Typography>
              </Card>
            </Link>
          );
        })}
      </Grid>
    </Container>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Brands);
