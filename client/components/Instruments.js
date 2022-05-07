import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardActionArea } from "@material-ui/core";

export const Instruments = ({ instruments, brands, categories }) => {
  return (
    <Container>
      <Grid container spacing={4}>
        {instruments.map((instrument) => {
          const brand = brands.find((brand) => brand.id === instrument.brandId);
          const category =
            categories.find(
              (category) => category.id === instrument.categoryId
            ) || {};
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
              <Card
                sx={{ maxWidth: 250, height: 350 }}
                alignContent="space-around"
              >
                <CardActionArea>
                  <Link to={`/instruments/${instrument.id}`}>
                    <CardMedia
                      component="img"
                      image={`/public/photos/${instrument.image}`}
                      height="225"
                    />
                  </Link>
                </CardActionArea>
                <CardContent>
                  <Typography>
                    {"Instrument Name:"}{" "}
                    <Link to={`/instruments/${instrument.id}`}>
                      {instrument.name}
                    </Link>
                    <br></br>
                    {"Brand:"}{" "}
                    <Link to={`/brands/${brand.id}`}>{brand.name}</Link>
                    <br></br>
                    {" Category:"}
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Instruments);
