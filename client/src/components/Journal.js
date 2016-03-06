import React, { Component, PropTypes } from 'react';

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
    return (
      <div>
        <h1>Журнал тренировок</h1>
        <div className="container">
          <div className="btn-group" role="group" aria-label="...">
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
        </div>
      </div>
    );
  }
}

Journal.propTypes = {
  journal: PropTypes.array
};
