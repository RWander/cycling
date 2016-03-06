import React, { Component, PropTypes } from 'react';

export default class Run extends Component {
  render() {
    const { training } = this.props;
    return (
      <div>run - {training._id}</div>
    );
  }
}

Run.propTypes = {
  training: PropTypes.object.isRequired
};
