import { useReducer } from "./userReducer";
import { combineReducers } from "redux";


export const rootReducer=combineReducers({
    user:useReducer,
});