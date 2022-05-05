import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";

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
