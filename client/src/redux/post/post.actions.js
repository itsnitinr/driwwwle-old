import axios from "axios";

import { setAlert } from "../alert/alert.actions";
import { GET_POSTS, POST_ERROR } from "./post.types";

// Get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
