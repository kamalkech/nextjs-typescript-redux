import { GET_PHOTOS, GET_PHOTO, SET_LOADING, LOGS_ERROR } from "./types";

const initialState = {
  photos: [],
  photo: null,
  loading: false,
  error: null,
};

const PhotoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_PHOTOS:
      return {
        ...state,
        photos: action.payload,
        loading: false,
      };
    case GET_PHOTO:
      let photo: any;
      if (action.payload.fromAPi) {
        photo = action.payload.photo;
      } else {
        photo = state.photos.filter((photo: any) => photo.id == action.payload);
        photo = photo[0];
      }

      return {
        ...state,
        photo: photo,
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

export default PhotoReducer;
