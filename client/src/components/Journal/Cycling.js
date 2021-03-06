import React, { Component, PropTypes } from 'react';

export default class Cycling extends Component {
  render() {
    const { training } = this.props;
    return (
      <div className="row">
        <div className="col-md-offset-2 col-md-2 text-right">
          <br />
          <img src="./img/bike-32.png" title="Велозаезд" />
        </div>
        <div className="col-md-8 text-left">
          <h4><a>{training.name}</a></h4>
          <p>
          <span><samp><strong>{training.distance}км</strong></samp></span>,&nbsp;
          время&nbsp;<span><samp><strong>{training.movingTime}</strong></samp></span>,&nbsp;
          сред.&nbsp;скорость&nbsp;<span><samp><strong>{training.averageSpeed}<small>км/ч</small></strong></samp></span>
          </p>
        </div>
      </div>
    );
  }
}

Cycling.propTypes = {
  training: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    movingTime: PropTypes.string.isRequired,
    //elapsedTime: PropTypes.string.isRequired,
    //elevationGain: PropTypes.number.isRequired,
    averageSpeed: PropTypes.number.isRequired//,
    //maxSpeed: PropTypes.number.isRequired
  }).isRequired
};
