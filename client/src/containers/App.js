import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFullInfo } from '../actions';
import Journal from '../components/Journal';
import Brief from '../components/Brief';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchFullInfo());
  }

  render() {
    const { brief, journal } = this.props;
    return (
      <div className="app">
        <section id="intro" className="intro-section">
          <div className="container">
            <Brief brief={brief}/>
          </div>
        </section>
        <section id="journal" className="journal-section">
          <div className="container">
            <Journal journal={journal}/>
          </div>
        </section>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  brief: PropTypes.object.isRequired,
  journal: PropTypes.array.isRequired
};

export default connect(state => state)(App);
