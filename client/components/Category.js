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
import { maxHeight } from "@mui/system";


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
            <Grid item xs={12} sm={6} md={4} key={instrument.id}>
              <Card sx={{ maxWidth: 300, height: 350 }}>
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
