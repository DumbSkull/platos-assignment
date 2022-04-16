const reducer = (state = [], action = []) => {
  if (action.type == "videoGames") return action.value;
  return state;
};

export default reducer;
