import React from 'react';
import request from 'superagent';

let Hello = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      bio: '',
      country: ''
    };
  },

  componentDidMount: function() {
    request
      .get(BACKEND)
      .end((err, res) => {
        var athlete = res.body;

        this.setState({
          username: `${athlete.firstName} ${athlete.lastName}`,
          bio: athlete.bio,
          country: athlete.country
        });
      });
  },

  render() {
    return (
      <div>
        <strong>{this.state.username} from {this.state.country}</strong>
        <i>{this.state.bio}</i>
      </div>
      // <div>
      //   <div className="row">
      //     <div className="col-md-8">.col-md-8</div>
      //     <div className="col-md-4">.col-md-4</div>
      //   </div>
      //   <input className="btn btn-lg btn-success" type="button" value="Input" />
      // </div>
    );
  }
});

export default Hello;
