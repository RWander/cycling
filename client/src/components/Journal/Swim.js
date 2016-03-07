import React, { Component, PropTypes } from 'react';

export default class Swim extends Component {
  render() {
    const { training } = this.props;
    return (
      <div className="row">
        <div className="col-md-offset-2 col-md-3">
          <h4>{training.startDate}</h4>
          <img src="./img/swimming-32.png" title="Плавание" />
        </div>
        <div className="col-md-7 text-left">
          <h4><a>{training.name}</a></h4>
          <p>
            <small title="Расстояние">р:&nbsp;</small><span><samp><strong>{training.distance}<small>км</small></strong></samp></span>&nbsp;
            <small title="Общее время">вр:&nbsp;</small><span><samp><strong>{training.elapsedTime}</strong></samp></span>&nbsp;
            <small title="Средняя скорость">ср.&nbsp;ск:&nbsp;</small><span><samp><strong>{training.averageSpeed}<small>км/ч</small></strong></samp></span>
          </p>
        </div>
      </div>
    );
  }
}

Swim.propTypes = {
  training: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    //movingTime: PropTypes.string.isRequired,
    elapsedTime: PropTypes.string.isRequired,
    //elevationGain: PropTypes.number.isRequired,
    averageSpeed: PropTypes.number.isRequired//,
    //maxSpeed: PropTypes.number.isRequired
  }).isRequired
};
