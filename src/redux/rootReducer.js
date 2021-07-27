import { combineReducers } from "redux";

import dishReducer from "./dish/dishReducer";

const rootReducer = combineReducers({
  dishReducer,
});

export default rootReducer;
