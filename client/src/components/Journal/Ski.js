import React, { Component, PropTypes } from 'react';

export default class Ski extends Component {
  render() {
    const { training } = this.props;
    return (
      <div>ski - {training._id}</div>
    );
  }
}

Ski.propTypes = {
  training: PropTypes.object.isRequired
};
