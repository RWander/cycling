import React from 'react';
import Brief from './brief.js';
import ReactDOM from 'react-dom';

let App = React.createClass({
  render(){
    return (
      <Brief />
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('react')
);
