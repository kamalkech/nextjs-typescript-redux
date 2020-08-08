import { GET_PHOTOS, GET_PHOTO, SET_LOADING, LOGS_ERROR } from "./types";

export const GetPhotos = (limit = 6) => async (dispatch: any) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/photos?_limit=" + limit
    );
    const data = await res.json();
    dispatch({
      type: GET_PHOTOS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};

export const GetPhoto = (id: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/photos/" + id
    );
    const data = await res.json();
    dispatch({
      type: GET_PHOTO,
      payload: { photo: data, fromAPi: true },
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
