import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import apiMiddleware from './middlewares/api';
import rootReducer from './root.reducer';

const configureStore = (preloadedState, extraMiddlewares = []) => {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    preloadedState,
    process.env.NODE_ENV === 'development'
      ? composeEnhancer(applyMiddleware(thunk, apiMiddleware, ...extraMiddlewares))
      : applyMiddleware(thunk, apiMiddleware, ...extraMiddlewares)
  );
};

export default configureStore;
