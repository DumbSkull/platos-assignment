import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import getDocuments from "../utilities/getDocuments";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  TextField,
  CircularProgress,
  Alert,
  LinearProgress,
} from "@mui/material";
import updateDocument from "../utilities/updateDocument";

function VideoGames() {
  //loading and error states:
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [editData, setEditData] = useState({});
  const [isSubmitLoading, setIsSubmitLoading] = useState({});

  //redux requirements:
  const state = useSelector((state) => state.videoGames);
  const dispatch = useDispatch();
  const { updateVideoGames } = bindActionCreators(actionCreators, dispatch);

  //function to get the video games data from firestore
  //and update it to the redux store
  const getVideoGamesAndUpdateState = async () => {
    try {
      setIsLoading(true);
      setError("");
      const videoGames = await getDocuments("video_games");
      updateVideoGames(videoGames);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError("Error trying to fetch the video games data from the database.");
    }
  };

  const checkIfEditting = (index) => {
    if (!editData[index]) return false;
    return editData[index].isEditting;
  };

  useEffect(() => {
    if (state.length === 0) getVideoGamesAndUpdateState();
  }, []);

  const onTextFieldChange = (e, index) => {
    const newData = { ...editData };
    newData[index][e.currentTarget.name] = e.currentTarget.value;
    setEditData(newData);
  };

  const onEditSubmit = async (videoGame, index) => {
    const newData = { ...editData[index] };
    let clonedData = { ...editData };
    delete newData.isEditting;
    delete newData.id;
    const isSubmitData = { ...isSubmitLoading };
    isSubmitData[index] = true;
    setIsSubmitLoading(isSubmitData);
    try {
      await updateDocument("video_games", videoGame.id, newData);
      delete clonedData[index];
      setEditData(clonedData);
      await getVideoGamesAndUpdateState();
    } catch (err) {
      setError(
        "Error trying to update Video Game #" +
          index +
          " (Game Name: " +
          videoGame.game_name +
          ")"
      );
    }
    isSubmitData[index] = false;
    setIsSubmitLoading(isSubmitData);
  };
  const displayEditVideoGameCard = (videoGame, index) => {
    return (
      <Card
        key={index}
        variant="outlined"
        sx={{ boxShadow: 2, m: 2, minWidth: 275, maxWidth: 500 }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Video Game #{index + 1}
          </Typography>
          <TextField
            id="game_name"
            sx={{ m: 1 }}
            size="small"
            name="game_name"
            label="Video Game Name"
            onChange={(e) => {
              onTextFieldChange(e, index);
            }}
            variant="outlined"
            value={editData[index].game_name}
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
            id="developer"
            name="developer"
            size="small"
            label="Developer"
            onChange={(e) => {
              onTextFieldChange(e, index);
            }}
            variant="outlined"
            value={editData[index].developer}
          />
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
                  onClick={() => onEditSubmit(videoGame, index)}
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

  const displayVideoGameCard = (videoGame, index) => {
    if (checkIfEditting(index))
      return displayEditVideoGameCard(videoGame, index);
    return (
      <Card
        key={index}
        variant="outlined"
        sx={{ boxShadow: 2, m: 2, minWidth: 275, maxWidth: 500 }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Video Game #{index + 1}
          </Typography>
          <Typography variant="h5" component="div">
            {videoGame.game_name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {videoGame.year}
          </Typography>
          <Typography variant="body2">
            Developer: {videoGame.developer}
          </Typography>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}></Grid>
            <Grid item xs={8}>
              <CardActions>
                <Button
                  onClick={() => {
                    const newObj = { ...videoGame, isEditting: true };
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
          Video Games List
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
      {state.map((videoGame, index) => displayVideoGameCard(videoGame, index))}
    </>
  );
}

export default VideoGames;
