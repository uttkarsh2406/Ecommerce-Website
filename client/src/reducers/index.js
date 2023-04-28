import { userReducer } from "./userReducer";
import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";

export const rootReducer=combineReducers({
    user:userReducer,
    search:searchReducer,
});