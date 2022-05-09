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

export const Instruments = ({
  instruments,
  brands,
  categories,
  history,
  match,
}) => {
  return (
    <Container>
      <Grid container spacing={4}>
        <select
          value={match.params.sort}
          name="sort"
          onChange={(ev) =>
            history.push(
              ev.target.value
                ? `/instruments/sort/${ev.target.value}`
                : "/instruments"
            )
          }
        >
          <option value=""> Sort By </option>
          <option value="AscName">Sort Ascending By Name</option>
          <option value="DescName">Sort Decending By Name</option>
          <option value="AscPrice">Sort Ascending By Price</option>
          <option value="DescPrice">Sort Descending By Price</option>
        </select>

        {instruments.map((instrument) => {
          const brand = brands.find((brand) => brand.id === instrument.brandId);
          const category =
            categories.find(
              (category) => category.id === instrument.categoryId
            ) || {};
          return (
            <Grid
              key={instrument.id}
              item
              container
              justifyContent="space-around"
              aligncontent="center"
              xs={12}
              sm={6}
              md={4}
            >
              <Card
                sx={{ maxWidth: 250, height: 350 }}
                aligncontent="space-around"
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
                    <Link to={`/brands/${brand?.id}`}>{brand?.name}</Link>
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

const mapState = (state, history) => {
  const sort = history.match.params.sort;
  
  if (sort === "AscName") {
    state.instruments.sort((a, b) => a.name.localeCompare(b.name));
  }
  else if (sort === "DescName") {
    state.instruments.sort((a, b) => b.name.localeCompare(a.name));
  }
  else if (sort === "AscPrice") {
    state.instruments.sort((a, b) => a.price - b.price);
  }
  else if (sort === "DescPrice") {
    state.instruments.sort((a, b) => b.price - a.price);
  }
  else state.instruments

  return {
    brands: state.brands,
    categories: state.categories,
    instruments: state.instruments,
  };
};
export default connect(mapState)(Instruments);
