import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardActionArea } from "@material-ui/core";


export const Categories = ({ categories }) => {
  return (
    <Container>
      <Grid container spacing={4}>
        {categories.map((category) => {
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
                <Link key={category.id} to={`/categories/${category.id}`}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={`/public/photos/default/${category.image}`}
                      height="300"
                    />
                    <CardContent>{category.name}</CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
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
