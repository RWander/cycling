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

  toggle(type) {
    const { dispatch, journal } = this.props;
    const types = journal.types.slice();
    const i = types.indexOf(type);

    if (i > -1) {
      types.splice(i, 1);
    } else {
      types.push(type);
    }

    dispatch(fetchJournal(types, 0, true));
  }

  onMoreClick() {
    const { dispatch, journal } = this.props;

    dispatch(fetchJournal(
      journal.types,
      journal.pageCount + 1,
      false
    ));
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

    const activeClass = 'btn btn-success btn-sm';
    const disactiveClass = 'btn btn-link btn-sm';

    return (
      <div>
        <h1>Журнал тренировок</h1>
        <div className="container">
          { /* Toolbar */ }
          <div className="btn-group" role="group" aria-label="..." style={{margin: '30px'}}>
            <button type="button"
              className={journal.types.indexOf('cycling') > -1 ? activeClass : disactiveClass}
              title="Велосипед"
              onClick={() => this.toggle('cycling')}>
              <img src="../img/bike-32.png" />
            </button>
            <button type="button"
              className={journal.types.indexOf('run') > -1 ? activeClass : disactiveClass}
              title="Бег"
              onClick={() => this.toggle('run')}>
              <img src="../img/running-32.png" />
            </button>
            <button type="button"
              className={journal.types.indexOf('ski') > -1 ? activeClass : disactiveClass}
              title="Беговые лыжи"
              onClick={() => this.toggle('ski')}>
              <img src="../img/skiing-32.png" />
            </button>
            <button type="button"
              className={journal.types.indexOf('swim') > -1 ? activeClass : disactiveClass}
              title="Плавание"
              onClick={() => this.toggle('swim')}>
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
