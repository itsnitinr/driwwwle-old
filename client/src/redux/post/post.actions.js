import axios from "axios";

import { setAlert } from "../alert/alert.actions";
import {
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  CLEAR_POST,
} from "./post.types";

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

// Add a new post
export const addPost = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const res = await axios.post("/api/posts", formData, config);
    dispatch({ type: ADD_POST, payload: res.data });
    history.push("/posts");
    dispatch(setAlert("Successfully added a post", "is-success"));
  } catch (err) {
    // Send alerts
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "is-danger")));
    }

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post by ID
export const getPostById = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch({ type: GET_POST, payload: res.data });
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
