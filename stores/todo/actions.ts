import { GET_POSTS, GET_POST, SET_LOADING, LOGS_ERROR } from "./types";

export const GetPosts = (limit = 6) => async (dispatch: any) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=" + limit
    );
    const data = await res.json();
    dispatch({
      type: GET_POSTS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};

export const GetPost = (id: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/" + id);
    const data = await res.json();
    dispatch({
      type: GET_POST,
      payload: { post: data, fromAPi: true },
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
