/* global BACKEND */

export const REQUEST_FULL_INFO = 'REQUEST_FULL_INFO';
export const RECEIVE_FULL_INFO = 'RECEIVE_FULL_INFO';
export const REQUEST_JOURNAL = 'REQUEST_JOURNAL';
export const RECEIVE_JOURNAL = 'RECEIVE_JOURNAL';


// -- Get Full Info
export function requestFullInfo() {
  return {
    type: REQUEST_FULL_INFO
  };
}

export function receiveFullInfo(data) {
  return {
    type: RECEIVE_FULL_INFO,
    data
  };
}

// -- Get Journal List
export function requestJournal(types, pageCount) {
  return {
    type: REQUEST_JOURNAL,
    types,
    pageCount
  };
}

export function receiveJournal(trainings, ended) {
  return {
    type: RECEIVE_JOURNAL,
    trainings,
    ended
  };
}

export function fetchFullInfo() {
  return function (dispatch) {
    dispatch(requestFullInfo());

    return _get(
      'full',
      json => dispatch(receiveFullInfo(json))
    );
  };
}

export function fetchJournal(types, pageCount) {
  return function (dispatch) {
    dispatch(requestJournal(types, pageCount));

    return _get(
      `activities?types=${types}&pageCount=${pageCount}`,
      json => {
        // TODO: to be continued - BACKEND should return 'trainings' and 'ended'!
        // const { trainings, ended } = json;
        // dispatch(receiveJournal(trainings, ended));
        dispatch(receiveJournal(json, false));
      }
    );
  };
}

function _get(serverMethod, success) {
  return fetch(`${BACKEND}/${serverMethod}`)
    .then(response => response.json())
    .then(success);

    // TODO: handle errors
    // ..
}
