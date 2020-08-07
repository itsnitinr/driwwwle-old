import { combineReducers } from "redux";

import alert from "./alert/alert.reducer";
import auth from "./auth/auth.reducer";

export default combineReducers({ alert, auth });
