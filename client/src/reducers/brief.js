import { REQUEST_FULL_INFO, RECEIVE_FULL_INFO } from '../actions';

const brief = (state = {}, action) => {
  switch (action.type) {
  case REQUEST_FULL_INFO:
    return state;
  case RECEIVE_FULL_INFO:
    return action.data;
  default:
    return state;
  }
};

export default brief;
