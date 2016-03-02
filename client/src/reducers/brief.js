import { REQUEST_FULL_INFO, RECEIVE_FULL_INFO } from '../actions';

const brief = (state = {}, action) => {
  debugger;
  
  switch (action.type) {
  case REQUEST_FULL_INFO:
    return state;
  case RECEIVE_FULL_INFO:
    return { username: '333333333333333' }; //action.data;
  default:
    return state;
  }
};

export default brief;
