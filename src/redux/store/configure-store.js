import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers/index';

export default function configureStore(initialState = {}) {
  // set up the middleware
  const middlewares = [];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV === 'development') {
    if ('__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' in window) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }

    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);
  }

  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));

  return store;
}
