import { REQUEST_FULL_INFO, RECEIVE_FULL_INFO } from '../actions';

const journal = (state = [], action) => {
  switch (action.type) {
  case REQUEST_FULL_INFO:
    return state;
  case RECEIVE_FULL_INFO: {
    const { trainings } = action.data;
    return trainings;
  } default:
    return state;
  }
};

export default journal;
