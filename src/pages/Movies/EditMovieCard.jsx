import React from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import { Delete, AddCircleOutline } from "@mui/icons-material";

function EditMovieCard({
  movie,
  index,
  onTextFieldChange,
  editData,
  setEditData,
  onEditSubmit,
  setError,
  isSubmitLoading,
}) {
  return (
    <Card
      variant="outlined"
      sx={{ boxShadow: 2, m: 2, minWidth: 275, maxWidth: 500 }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Movie #{index + 1}
        </Typography>
        <TextField
          id="movie_name"
          sx={{ m: 1 }}
          size="small"
          name="movie_name"
          label="Movie Name"
          onChange={(e) => {
            onTextFieldChange(e, index);
          }}
          variant="outlined"
          value={editData[index].movie_name}
        />

        <TextField
          sx={{ m: 1 }}
          id="year"
          name="year"
          size="small"
          label="Year"
          onChange={(e) => {
            onTextFieldChange(e, index);
          }}
          variant="outlined"
          value={editData[index].year}
        />
        <TextField
          sx={{ m: 1 }}
          id="rating"
          name="rating"
          size="small"
          label="Rating"
          onChange={(e) => {
            onTextFieldChange(e, index);
          }}
          variant="outlined"
          value={editData[index].rating}
        />
        <Typography variant="body2">
          Genres:
          <br></br>
          {editData[index].genre &&
            editData[index].genre.map((g, innerIndex) => (
              <React.Fragment key={innerIndex}>
                <TextField
                  sx={{ m: 1 }}
                  key={innerIndex}
                  id="genre"
                  name="genre"
                  size="small"
                  label={"Genre #" + (innerIndex + 1)}
                  onChange={(e) => {
                    const newData = { ...editData };
                    newData[index].genre[innerIndex] = e.currentTarget.value;
                    setEditData(newData);
                    console.log("setEditData: ", newData);
                  }}
                  variant="outlined"
                  value={editData[index].genre[innerIndex]}
                />
                <IconButton
                  onClick={() => {
                    if (editData[index].genre.length === 1) {
                      setError("Please keep at-least one genre.");
                      return;
                    }
                    setError("");
                    const newState = { ...editData };
                    newState[index].genre.splice(innerIndex, 1);
                    setEditData(newState);
                  }}
                  sx={{ mt: 1 }}
                  aria-label="delete"
                >
                  <Delete />
                </IconButton>
              </React.Fragment>
            ))}
          <br />
          <IconButton
            onClick={() => {
              if (
                editData[index].genre[editData[index].genre.length - 1] === ""
              ) {
                setError(
                  "Please fill the last genre before you add a new one. "
                );
                return;
              }
              const newState = { ...editData };
              newState[index].genre.push("");
              setEditData(newState);
            }}
            aria-label="add"
          >
            <AddCircleOutline />
          </IconButton>
          <br />
        </Typography>
        <hr />
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <CardActions>
              <Button
                color="error"
                onClick={() => {
                  let newState = { ...editData };
                  delete newState[index];
                  //newState[index] = newObj;
                  setEditData(newState);
                }}
                fullWidth={true}
                variant="outlined"
                size="small"
              >
                Cancel Editting
              </Button>
            </CardActions>
          </Grid>
          <Grid item xs={8}>
            <CardActions>
              <Button
                onClick={() => onEditSubmit(movie, index)}
                fullWidth={true}
                color="success"
                variant="outlined"
                size="small"
              >
                {isSubmitLoading[index] ? (
                  <CircularProgress size={23} />
                ) : (
                  "Submit"
                )}
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default EditMovieCard;
