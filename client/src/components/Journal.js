import React, { Component, PropTypes } from 'react';

export default class Journal extends Component {
  render() {
    return (
      <h1>Журнал тренировок</h1>
    );
  }
}

Journal.propTypes = {
  journal: PropTypes.array
};
