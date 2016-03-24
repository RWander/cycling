import { combineReducers } from 'redux';
import brief from './brief';
import journal from './journal';

const rootReducer = combineReducers({
  brief,
  journal
});

export default rootReducer;
