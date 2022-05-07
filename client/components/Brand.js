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
            <Card>
              <div key={instrument.id}>
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
              </div>
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
