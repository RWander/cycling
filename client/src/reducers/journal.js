import { REQUEST_FULL_INFO, RECEIVE_FULL_INFO } from '../actions';

const journal = (state = [], action) => {
  switch (action.type) {
  case REQUEST_FULL_INFO:
    return state;
  case RECEIVE_FULL_INFO: {
    const trainings = action.data.trainings.map(convertUnits);
    return trainings;
  } default:
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
