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

export const Brand = ({ instruments, brand, categories }) => {
  const instrumentsList = instruments.filter(
    (instrument) => instrument.brandId === brand.id
  );
  if (!brand) return null;
  return (
    <Container>
      <h1>{brand.name} Instruments</h1>
      <ul>
        {instrumentsList.map((instrument) => {
          return (
            <Card key={instrument.id}>
              <Link to={`/instruments/${instrument.id}`}>
                <CardMedia
                  component="img"
                  image={`/public/photos/${instrument.image}`}
                ></CardMedia>
              </Link>
              <CardContent>
                <Typography>
                  {"Instrument Name:"}{" "}
                  <Link to={`/instruments/${instrument.id}`}>
                    {instrument.name}
                  </Link>
                  <br></br>
                  {"Brand:"}{" "}
                  <Link to={`/brands/${brand.id}`}>{brand.name}</Link>
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </ul>
    </Container>
  );
};

const mapState = ({ instruments, brands, categories }, otherProps) => {
  const brand =
    brands.find((brand) => brand.id === otherProps.match.params.id * 1) || {};
  return { instruments, brand, categories };
};
//MUI 5 updates
export default connect(mapState)(Brand);
