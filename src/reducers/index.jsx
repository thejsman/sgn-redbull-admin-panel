import statsReducers from "./statsReducers";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  statsReducers,
});

export default rootReducer;
