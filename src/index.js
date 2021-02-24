import React from 'react';

import { render } from 'react-dom';

import { Provider } from 'react-redux';

import configureStore from './redux/store/configure-store';
import initialState from './redux/store/initial-state';

import './index.css';
import App from './App';

// the redux store
const store = configureStore(initialState());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
