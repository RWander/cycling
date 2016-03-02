import React from 'react';
import Brief from './components/brief.js';
// import Journal from './components/journal.js';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

// render(
//   <Brief />,
//   document.getElementById('brief-component')
// );
// render(
//   <Journal />,
//   document.getElementById('journal-component')
// );
//

const store = configureStore();

render(
  <Provider store={store}>
    <Brief />
  </Provider>,
  document.getElementById('brief-component')
);

//fetchFullInfo()(store.dispatch);

// // TODO: use Redux
// // ..
// // ================================ >>
// import { fetchFullInfo } from './actions';
// import configureStore from './store';
//
// const store = configureStore();
//
// store.subscribe(() =>
//   /*eslint-disable no-console */
//   console.log(store.getState())
// );
//
// fetchFullInfo()(store.dispatch);
// // <<================================
