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


export const Category = ({ instruments, brands, category }) => {
  const instrumentsList =
    instruments.filter((instrument) => instrument.categoryId === category.id) ||
    {};
  return (
    <Container>
      <h1>{`List of ${category.name}'s in our Store`}</h1>

      <Grid container spacing={4}>
        {instrumentsList.map((instrument) => {
          const brand = brands.find((brand) => brand.id === instrument.brandId);
          return (
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 300, height: 350 }}>
                <div key={instrument.id}>
                  <div>
                    {/* <CardMedia 
                    COMPONENT = "img"
                    image= /> */}
                    <img
                      id="detailPage"
                      src={`/public/photos/${instrument.image}`}
                    />
                  </div>
                  <div>
                    <Link to={`/instruments/${instrument.id}`}>
                      {instrument.name}
                    </Link>
                  </div>
                  <div>
                    <Link to={`/brands/${brand.id}`}>{brand.name}</Link>
                  </div>
                </div>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

const mapState = ({ instruments, brands, categories }, otherProps) => {
  const category =
    categories.find(
      (category) => category.id === otherProps.match.params.id * 1
    ) || {};
  return { instruments, brands, category };
};

export default connect(mapState)(Category);
