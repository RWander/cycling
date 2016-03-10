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
export function requestJournal(types, skip) {
  return {
    type: REQUEST_JOURNAL,
    types,
    skip
  };
}

export function receiveJournal(journal, ended) {
  return {
    type: RECEIVE_JOURNAL,
    journal,
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

export function fetchJournal(types, skip) {
  return function (dispatch) {
    dispatch(requestJournal(types, skip));

    return _get(
      `activities?types=${types}&skip=${skip}`,
      json => {
        const { journal, ended } = json;
        dispatch(receiveJournal(journal, ended));
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
