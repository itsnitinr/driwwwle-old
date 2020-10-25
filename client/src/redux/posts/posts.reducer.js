import {
  GET_POSTS,
  POST_ERROR,
  CLEAR_POST,
} from "./posts.types";

const initialState = {
  posts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return { ...state, posts: payload, loading: false };
    case CLEAR_POST:
      return { ...state, posts: null, loading: false };
    case POST_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
