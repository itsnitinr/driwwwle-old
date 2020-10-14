import axios from "axios";

import { GET_POSTS, POST_ERROR, CLEAR_POST } from "./posts.types";

// Get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({ type: CLEAR_POST });
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all posts of an user
export const getUserPosts = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/user/${userId}`);
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
