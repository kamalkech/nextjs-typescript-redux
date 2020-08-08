import App, { AppProps, AppContext } from "next/app";

// Redux.
import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
// Store.
import combinedReducer from "../stores/index";

// Component App.
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// Middleware.
const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// Reducer.
const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    // if (state.posts.posts) nextState.posts.posts = state.posts.posts;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

// Init store.
const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

// Create a wrapper.
const wrapper = createWrapper(initStore);

// Create Initial Props.
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default wrapper.withRedux(MyApp);
