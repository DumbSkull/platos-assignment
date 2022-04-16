const reducer = (state = [], action = []) => {
  if (action.type == "valid") return action.value;
  return state;
};

export default reducer;
