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
      <Grid container spacing={4}>
        {brands.map((brand) => {
          return (
            <Grid
              key={brand.id}
              item
              container
              justifyContent="space-around"
              alignContent="center"
              xs={12}
              sm={6}
              md={4}
            >
              <Link to={`/brands/${brand.id}`}>
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
