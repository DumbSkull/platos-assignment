import React from "react";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";

function DataCard({
  item,
  index,
  editData,
  setEditData,
  checkIfEditting,
  type,
}) {
  return (
    <>
      <Card
        variant="outlined"
        sx={{ boxShadow: 2, m: 2, minWidth: 275, maxWidth: 500 }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {type} #{index + 1}
          </Typography>

          <Typography variant="h5" component="div">
            {type == "Movie" ? item.movie_name : item.game_name}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {item.year}
          </Typography>

          {type === "Video Game" && (
            <Typography variant="body2">Developer: {item.developer}</Typography>
          )}

          {type === "Movie" && (
            <Typography variant="body2">
              Rating: {item.rating}
              <br />
              Genre:{" "}
              {item.genre.map((g, innerIndexx) => (
                <React.Fragment key={innerIndexx}>
                  {g + (item.genre.length == index + 1 ? "" : ", ")}
                </React.Fragment>
              ))}
            </Typography>
          )}

          <hr />
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}></Grid>
            <Grid item xs={8}>
              <CardActions>
                <Button
                  onClick={() => {
                    let newObj = { ...item, isEditting: true };
                    newObj = JSON.parse(JSON.stringify(newObj));
                    let newState = { ...editData, [index]: newObj };
                    //newState[index] = newObj;
                    setEditData(newState);
                  }}
                  disabled={checkIfEditting(index)}
                  fullWidth={true}
                  variant="outlined"
                  size="small"
                >
                  Edit
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default DataCard;
