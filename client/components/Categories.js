import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export const Categories = ({ categories }) => {
  return (
    <Container>
      <Grid
        container
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
      >
        {categories.map((category) => {
          return (
            <Link key={category.id} to={`/categories/${category.id}`}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={`/public/photos/default/${category.image}`}
                  />
                  <CardContent>{category.name}</CardContent>
                </CardActionArea>
              </Card>
            </Link>
          );
        })}
      </Grid>
    </Container>

    // <div className="ctgyLink">

    // </div>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Categories);
