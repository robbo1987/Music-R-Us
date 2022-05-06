import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export const Instruments = ({ instruments, brands, categories }) => {
  return (
    <Container>
      <ul>
        {instruments.map((instrument) => {
          const brand = brands.find((brand) => brand.id === instrument.brandId);
          const category =
            categories.find(
              (category) => category.id === instrument.categoryId
            ) || {};
          return (
            <Card>
              <CardActionArea>
                <Link to={`/instruments/${instrument.id}`}>
                  <CardMedia
                    component="img"
                    image={`/public/photos/${instrument.image}`}
                  ></CardMedia>
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
          );
        })}
      </ul>
    </Container>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Instruments);
