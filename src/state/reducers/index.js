import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import videoGameReducer from "./videoGameReducer";

const reducers = combineReducers({
  movies: movieReducer,
  videoGames: videoGameReducer,
});

export default reducers;
