import axios from "axios";

import { setAlert } from "../alert/alert.actions";
import { GET_PROFILE, PROFILE_ERROR } from "./profile.types";
import { SET_ALERT } from "../alert/alert.types";

// Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(
      setAlert(edit ? "Profile updated" : "Profile created", "is-success")
    );

    // Redirect to dashboard after creating new profile
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    // Send alerts
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "is-danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
