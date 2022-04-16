export const updateMovies = (newArray) => {
  return (dispatch) => {
    dispatch({ type: "movies", value: newArray });
  };
};

export const updateVideoGames = (newArray) => {
  return (dispatch) => {
    dispatch({ type: "videoGames", value: newArray });
  };
};
