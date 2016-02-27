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
