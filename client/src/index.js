import React from 'react';
import Brief from './components/brief.js';
import Journal from './components/journal.js';
import { render } from 'react-dom';

render(
  <Brief />,
  document.getElementById('brief-component')
);
render(
  <Journal />,
  document.getElementById('journal-component')
);

// TODO: use Redux
// ..
// ================================ >>
import { fetchFullInfo } from './actions';
import configureStore from './store';

const store = configureStore();

store.subscribe(() =>
  /*eslint-disable no-console */
  console.log(store.getState())
);

fetchFullInfo()(store.dispatch);
// <<================================
