import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import getDocuments from "../../utilities/getDocuments";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  Snackbar,
  LinearProgress,
} from "@mui/material";
import updateDocument from "../../utilities/updateDocument";
import MuiAlert from "@mui/material/Alert";
import DataCard from "../common/DataCard";
import EditVideoGameCard from "./EditVideoGameCard";

const MuiAlertBox = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

  const validateData = (data) => {
    if (data.game_name === "" || data.developer === "" || data.year === "")
      return false;
    return true;
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

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setError("");
  };

  const onEditSubmit = async (videoGame, index) => {
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

  const displayVideoGameCard = (videoGame, index) => {
    if (checkIfEditting(index))
      return (
        <EditVideoGameCard
          videoGame={videoGame}
          index={index}
          onEditSubmit={onEditSubmit}
          isSubmitLoading={isSubmitLoading}
          editData={editData}
          setEditData={setEditData}
          onTextFieldChange={onTextFieldChange}
        />
      );
    return (
      <DataCard
        item={videoGame}
        index={index}
        editData={editData}
        setEditData={setEditData}
        checkIfEditting={checkIfEditting}
        type="Video Game"
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
        <MuiAlertBox severity="error">{error}</MuiAlertBox>
      </Snackbar>
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
      {state.map((videoGame, index) => displayVideoGameCard(videoGame, index))}
    </>
  );
}

export default VideoGames;
