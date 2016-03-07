import React, { Component, PropTypes } from 'react';
import Cycling from './Cycling';
import Run from './Run';
import Ski from './Ski';
import Swim from './Swim';

export default class Journal extends Component {
  toggleBtn(btn) {
    if (btn.className.indexOf('btn-success') > -1) {
      btn.classList.remove('btn-success');
      btn.classList.add('btn-link');
    } else {
      btn.classList.add('btn-success');
      btn.classList.remove('btn-link');
    }
  }

  render() {
    const { journal } = this.props;
    const renderTraining = (t) => {
      if (t.type === 'cycling') {
        return (
          <Cycling training={t} />
        );
      } else if (t.type === 'run') {
        return (
          <Run training={t} />
        );
      } else if (t.type === 'ski') {
        return (
          <Ski training={t} />
        );
      } else if (t.type === 'swim') {
        return (
          <Swim training={t} />
        );
      }
    };
    return (
      <div>
        <h1>Журнал тренировок</h1>
        <div className="container">

          { /* Toolbar */ }
          <div className="btn-group" role="group" aria-label="..." style={{margin:'30px'}}>
            <button type="button" className="btn btn-success btn-sm" title="Велосипед"
              onClick={(e) => this.toggleBtn(e.currentTarget)}>
              <img src="../img/bike-32.png" />
            </button>
            <button type="button" className="btn btn-success btn-sm" title="Бег"
              onClick={(e) => this.toggleBtn(e.currentTarget)}>
              <img src="../img/running-32.png" />
            </button>
            <button type="button" className="btn btn-link btn-sm" title="Беговые лыжи"
              onClick={(e) => this.toggleBtn(e.currentTarget)}>
              <img src="../img/skiing-32.png" />
            </button>
            <button type="button" className="btn btn-link btn-sm" title="Плавание"
              onClick={(e) => this.toggleBtn(e.currentTarget)}>
              <img src="../img/swimming-32.png" />
            </button>
          </div>

          { /* Training list */ }
          {journal.map(training =>
            <div>{renderTraining(training)}</div>
          )}
        </div>
      </div>
    );
  }
}

Journal.propTypes = {
  journal: PropTypes.array
};
