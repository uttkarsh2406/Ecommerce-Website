import { userReducer } from "./userReducer";
import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";

export const rootReducer=combineReducers({
    user:userReducer,
    search:searchReducer,
    cart:cartReducer,
    drawer:drawerReducer,
});