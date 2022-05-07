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
      <Grid container spacing={4}>
        {brands.map((brand) => {
          return (
            <Grid
              item
              container
              justifyContent="space-around"
              alignContent="center"
              xs={12}
              sm={6}
              md={4}
            >
              <Link key={brand.id} to={`/brands/${brand.id}`}>
                <Card
                  sx={{ width: 200, height: 100 }}
                  aligncontent="space-around"
                >
                  <CardContent>
                    <Typography>{brand.name}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Brands);
