import React, { Component, PropTypes } from 'react';
import Cycling from './Cycling';
import Run from './Run';
import Ski from './Ski';
import Swim from './Swim';
import { fetchJournal } from '../../actions';

export default class Journal extends Component {
  constructor(props) {
    super(props);
    this.onMoreClick = this.onMoreClick.bind(this);
  }

  toggleBtn(btn) {
    if (btn.className.indexOf('btn-success') > -1) {
      btn.classList.remove('btn-success');
      btn.classList.add('btn-link');
    } else {
      btn.classList.add('btn-success');
      btn.classList.remove('btn-link');
    }
  }

  onMoreClick() {
    const { dispatch, journal } = this.props;
    const types = [];
    const pageCount = journal.pageCount + 1;

    dispatch(fetchJournal(types, pageCount));
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

    let moreBtn;
    if ((journal.pageCount + 1) * 10 === journal.trainings.length) {
      moreBtn =
        <button type="button" className="btn btn-success btn-sm" style={{marginTop: '20px'}}
          onClick={this.onMoreClick}>
          Ещё
        </button>;
    }

    return (
      <div>
        <h1>Журнал тренировок</h1>
        <div className="container">
          { /* Toolbar */ }
          <div className="btn-group" role="group" aria-label="..." style={{margin: '30px'}}>
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
          {journal.trainings.map(training =>
            <div>{renderTraining(training)}</div>
          )}

          { /* The 'More' button */ }
          {moreBtn}

          { /* Footer (TODO rwander - вынести в index.html) */ }
          <div className="footer navbar-bottom text-primary" style={{marginTop:'50px', marginBottom:'10px'}}>
            <small>Идея и реализация: <a href="mailto:roman.korneyev@gmail.com">Роман Корнеев</a></small>
            <br/><small>2016</small>
          </div>
        </div>
      </div>
    );
  }
}

Journal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  journal: PropTypes.shape({
    types: PropTypes.array.isRequired,
    pageCount: PropTypes.number.isRequired,
    trainings: PropTypes.array.isRequired
  }).isRequired
};
