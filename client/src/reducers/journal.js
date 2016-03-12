import {
  REQUEST_FULL_INFO,
  RECEIVE_FULL_INFO,
  REQUEST_JOURNAL,
  RECEIVE_JOURNAL
} from '../actions';

import { duration } from 'moment';
import 'moment-duration-format';

const initState = {
  types: ['run', 'ski', 'cycling', 'swim'],
  pageCount: 0,
  trainings: []
};

const journal = (state = initState, action) => {
  switch (action.type) {
  case REQUEST_FULL_INFO:
    return state;
  case RECEIVE_FULL_INFO: {
    return Object.assign(
      { },
      state,
      { trainings: action.data.trainings.map(convertUnits) }
    );
  }
  case REQUEST_JOURNAL: {
    return Object.assign(
      { },
      state, {
        types: action.types,
        pageCount: action.pageCount,
        trainings: action.clean === true
          ? []
          : state.trainings.slice()
      }
    );
  }
  case RECEIVE_JOURNAL: {
    return Object.assign(
      { },
      state, {
        trainings: state.trainings.concat(action.trainings.map(convertUnits))
      }
    );
  }
  default:
    return state;
  }
};

function convertUnits(training) {
  training.distance = Number((training.distance/1000).toFixed(1)) /* m to km */;

  // TODO (rwander): wait for https://github.com/jsmreese/moment-duration-format/issues/43
  // ..
  let time = duration(training.elapsedTime, 'seconds').format('hh:mm:ss');
  if (time.length <= 5) {
    time = `00:${time}`;
  }
  training.elapsedTime = time;
  training.averageSpeed = Number((training.averageSpeed*3600/1000).toFixed(1)) /* m/s to km/h */;

  return training;
}

export default journal;
