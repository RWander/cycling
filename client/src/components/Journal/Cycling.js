import React, { Component, PropTypes } from 'react';

export default class Cycling extends Component {
  render() {
    const { training } = this.props;
    return (
      <div>cycling - {training._id}</div>
    );
  }
}

Cycling.propTypes = {
  training: PropTypes.object.isRequired
};
