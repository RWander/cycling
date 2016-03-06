import React, { Component, PropTypes } from 'react';

export default class Swim extends Component {
  render() {
    const { training } = this.props;
    return (
      <div>swim - {training._id}</div>
    );
  }
}

Swim.propTypes = {
  training: PropTypes.object.isRequired
};
