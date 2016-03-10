import {
  REQUEST_FULL_INFO,
  RECEIVE_FULL_INFO,
  REQUEST_JOURNAL,
  RECEIVE_JOURNAL
} from '../actions';

const initState = {
  types: ['cycling', 'swim'],
  ended: false,
  journal: []
};

const journal = (state = initState, action) => {
  switch (action.type) {
  case REQUEST_FULL_INFO:
    return state;
  case RECEIVE_FULL_INFO: {
    // const trainings = action.data.trainings.map(convertUnits);
    // return trainings;
    return {
      types: state.types,
      ended: state.ended,
      journal: action.data.trainings.map(convertUnits)
    };
  }
  case REQUEST_JOURNAL: {
    return {
      types: action.types,
      ended: false,

      // TODO: нужно ли передовать journal если он еще не загружен
      // ..
      journal: []
    };
  }
  case RECEIVE_JOURNAL: {
    return {
      types: state.types,
      ended: action.ended,
      journal: state.journal.concat(action.journal)
    };
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
