import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  CircularProgress,
  IconButton,
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  Alert,
  TextField,
  LinearProgress,
} from "@mui/material";
import { Delete, AddCircleOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { actionCreators } from "../state/index";
import getDocuments from "../utilities/getDocuments";
import updateDocument from "../utilities/updateDocument";

function Movies() {
  //loading and error states:
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [editData, setEditData] = useState({});
  const [isSubmitLoading, setIsSubmitLoading] = useState({});

  //redux requirements:
  const state = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const { updateMovies } = bindActionCreators(actionCreators, dispatch);

  //function to get the video games data from firestore
  //and update it to the redux store
  const getMoviesAndUpdateState = async () => {
    try {
      setIsLoading(true);
      setError("");
      const movies = await getDocuments("movies");
      updateMovies(movies);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError("Error trying to fetch the movies data from the database.");
    }
  };

  const checkIfEditting = (index) => {
    if (!editData[index]) return false;
    return editData[index].isEditting;
  };

  useEffect(() => {
    //fetch the movies here and updateMovies
    if (state.length === 0) getMoviesAndUpdateState();
  }, []);

  const onTextFieldChange = (e, index) => {
    const newData = { ...editData };
    newData[index][e.currentTarget.name] = e.currentTarget.value;
    setEditData(newData);
  };

  const onEditSubmit = async (movie, index) => {
    const newData = { ...editData[index] };
    let clonedData = { ...editData };
    delete newData.isEditting;
    delete newData.id;
    const isSubmitData = { ...isSubmitLoading };
    isSubmitData[index] = true;
    setIsSubmitLoading(isSubmitData);
    try {
      await updateDocument("movies", movie.id, newData);
      delete clonedData[index];
      setEditData(clonedData);
      await getMoviesAndUpdateState();
    } catch (err) {
      setError(
        "Error trying to update Movie #" +
          index +
          " (Movie Name: " +
          movie.movie_name +
          ")"
      );
    }
    isSubmitData[index] = false;
    setIsSubmitLoading(isSubmitData);
  };

  const displayEditMovieCard = (movie, index) => {
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
                )
                  return;
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
  };

  const displayMovieCard = (movie, index) => {
    if (checkIfEditting(index)) return displayEditMovieCard(movie, index);
    return (
      <Card
        variant="outlined"
        sx={{ boxShadow: 2, m: 2, minWidth: 275, maxWidth: 500 }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Movie #{index + 1}
          </Typography>

          <Typography variant="h5" component="div">
            {movie.movie_name}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {movie.year}
          </Typography>

          <Typography variant="body2">
            Rating: {movie.rating}
            <br />
            Genre:{" "}
            {movie.genre.map((g, innerIndexx) => (
              <React.Fragment key={innerIndexx}>
                {g + (movie.genre.length == index + 1 ? "" : ", ")}
              </React.Fragment>
            ))}
          </Typography>
          <hr />
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}></Grid>
            <Grid item xs={8}>
              <CardActions>
                <Button
                  onClick={() => {
                    let newObj = { ...movie, isEditting: true };
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
    );
  };

  return (
    <>
      <Grid container justifyContent="space-between">
        <Typography variant="h4" component="div" gutterBottom>
          Movies List
        </Typography>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button size="large" variant="contained">
            Go Back
          </Button>
        </Link>
      </Grid>
      <hr></hr>
      {isLoading ? <LinearProgress /> : null}
      {error ? <Alert severity="error">{error}</Alert> : null}
      {state.map((movie, index) => (
        <div key={index}> {displayMovieCard(movie, index)}</div>
      ))}
    </>
  );
}

export default Movies;
