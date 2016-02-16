import React from 'react';

let Hello = React.createClass({
  getInitialState: function() {
    return {
      name: 'Roman'
    };
  },

  render(){
    return (
      <div>
        <div className="row">
          <div className="col-md-1">.col-md-1</div>
          <div className="col-md-1">.col-md-1</div>
          <div className="col-md-1">.col-md-1</div>
          <div className="col-md-1">.col-md-1</div>
          <div className="col-md-1">.col-md-1</div>
          <div className="col-md-1">.col-md-1</div>
          <div className="col-md-1">.col-md-1</div>
          <div className="col-md-1">.col-md-1</div>
          <div className="col-md-1">.col-md-1</div>
          <div className="col-md-1">.col-md-1</div>
          <div className="col-md-1">.col-md-1</div>
          <div className="col-md-1">.col-md-1</div>
        </div>
        <div className="row">
          <div className="col-md-8">.col-md-8</div>
          <div className="col-md-4">.col-md-4</div>
        </div>
        <input className="btn btn-lg btn-success" type="button" value="Input" />
      </div>
    );
  }
});

export default Hello;
