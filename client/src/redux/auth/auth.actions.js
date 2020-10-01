import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOGIN_REQUEST,
  REGISTER_REQUEST
} from "./auth.types";
import { CLEAR_PROFILE } from "../profile/profile.types";
import { setAlert } from "../alert/alert.actions";

import setAuthToken from "../../utils/setAuthToken";

// Load user from token
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register an user
export const registerUser = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    // Dispatch REGISTER_REQUEST
    dispatch({
      type: REGISTER_REQUEST,
    });

    // Make a request to backend API
    const res = await axios.post("/api/users", body, config);

    // If no errors, dispatch REGISTER_SUCCESS
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    // Send alerts
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "is-danger")));
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "is-danger"));
    }

    // Dispatch REGISTER_FAIL if error
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login an user
export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    // Dispatch LOGIN_REQUEST
    dispatch({
      type: LOGIN_REQUEST,
    });

    // Make a request to backend API
    const res = await axios.post("/api/auth", body, config);

    // If no errors, dispatch LOGIN_SUCCESS
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    // Send alerts
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "is-danger")));
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "is-danger"));
    }

    // Dispatch LOGIN_FAIL if error
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout an user
export const logoutUser = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};
