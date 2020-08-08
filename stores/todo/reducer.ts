import { GET_POSTS, GET_POST, SET_LOADING, LOGS_ERROR } from "./types";

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
};

const PostReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case GET_POST:
      let post: any;
      if (action.payload.fromAPi) {
        post = action.payload.post;
      } else {
        post = state.posts.filter((post: any) => post.id == action.payload);
        post = post[0];
      }

      return {
        ...state,
        post: post,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case LOGS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default PostReducer;
