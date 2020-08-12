import {
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  GET_POST,
  CLEAR_POST,
} from "./post.types";

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POST:
      return { ...state, post: payload, loading: false };
    case GET_POSTS:
      return { ...state, posts: payload, loading: false };
    case ADD_POST:
      return { ...state, posts: [...state.posts, payload], loading: false };
    case CLEAR_POST:
      return { ...state, post: null, loading: false };
    case POST_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
