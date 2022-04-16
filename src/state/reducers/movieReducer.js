const reducer = (state = [], action = []) => {
  if (action.type == "movies") return action.value;
  return state;
};

export default reducer;
