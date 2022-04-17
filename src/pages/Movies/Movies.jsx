import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Grid,
  Typography,
  Snackbar,
  LinearProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { actionCreators } from "../../state/index";
import getDocuments from "../../utilities/getDocuments";
import updateDocument from "../../utilities/updateDocument";
import MuiAlert from "@mui/material/Alert";
import DataCard from "../common/DataCard";
import EditMovieCard from "./EditMovieCard";

const MuiAlertBox = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

  const validateData = (data) => {
    if (data.movie_name === "" || data.year === "") return false;
    for (let i = 0; i < data.genre.length; i++) {
      if (data.genre[i].length === 0) return false;
    }
    return true;
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setError("");
  };

  const onEditSubmit = async (movie, index) => {
    if (!validateData(editData[index])) {
      setError("Some (or maybe one) of the fields are empty.");
      return;
    }
    setError("");
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

  const displayMovieCard = (movie, index) => {
    if (checkIfEditting(index))
      return (
        <EditMovieCard
          movie={movie}
          index={index}
          onTextFieldChange={onTextFieldChange}
          editData={editData}
          setEditData={setEditData}
          setError={setError}
          isSubmitLoading={isSubmitLoading}
          onEditSubmit={onEditSubmit}
        />
      );
    return (
      <DataCard
        item={movie}
        index={index}
        editData={editData}
        setEditData={setEditData}
        checkIfEditting={checkIfEditting}
        type="Movie"
      />
    );
  };

  return (
    <>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlertBox
          sx={{ width: "100%" }}
          onCLose={handleSnackbarClose}
          severity="error"
        >
          {error}
        </MuiAlertBox>
      </Snackbar>
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
      {state.map((movie, index) => (
        <div key={index}> {displayMovieCard(movie, index)}</div>
      ))}
    </>
  );
}

export default Movies;
