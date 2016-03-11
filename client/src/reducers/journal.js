import {
  REQUEST_FULL_INFO,
  RECEIVE_FULL_INFO,
  REQUEST_JOURNAL,
  RECEIVE_JOURNAL
} from '../actions';

const initState = {
  types: ['cycling', 'swim'],
  ended: false,
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
      state,
      { types: action.types }
    );
  }
  case RECEIVE_JOURNAL: {
    return Object.assign(
      { },
      state,
      { ended: action.ended, trainings: state.trainings.concat(action.trainings) }
    );
  }
  default:
    return state;
  }
};

function convertUnits(training) {
  // TODO (rwander): convertUnits
  // ..

  training.distance = Number((training.distance/1000).toFixed(1)) /*m to km*/;
  //training.elapsedTime = Number((training.elapsedTime/360).toFixed(1)) /*c to km*/;
  //training.distance = Number((training.distance/1000).toFixed(1)) /*m to km*/;

  return training;
}

export default journal;
