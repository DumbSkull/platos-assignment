import React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Link to="/movies" style={{ textDecoration: "none" }}>
            <Button fullWidth={true} size="large" variant="contained">
              Go to Movies List
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="/video-games" style={{ textDecoration: "none" }}>
            <Button fullWidth={true} size="large" variant="contained">
              Go to Video Games List
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
