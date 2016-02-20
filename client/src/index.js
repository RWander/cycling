import React from 'react';
import Brief from './brief.js';

let App = React.createClass({
  render(){
    return (
      <Brief />
    );
  }
});

React.render(
  <App />,
  document.getElementById('react')
);
