import { combineReducers } from "redux";
import PostReducer from "./todo/reducer";
import PhotoReducer from "./photo/reducer";

const combinedReducer = combineReducers({
  posts: PostReducer,
  photos: PhotoReducer,
});

export default combinedReducer;
