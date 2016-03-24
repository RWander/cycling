import React from 'react';
import App from './containers/App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import moment from 'moment';

moment.locale('ru');

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
