import React from "react";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  TextField,
  CircularProgress,
} from "@mui/material";

function EditVideoGameCard({
  videoGame,
  index,
  onTextFieldChange,
  onEditSubmit,
  editData,
  setEditData,
  isSubmitLoading,
}) {
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
}

export default EditVideoGameCard;
