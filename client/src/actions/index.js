/* global BACKEND */

export const REQUEST_FULL_INFO = 'REQUEST_FULL_INFO';
export const RECEIVE_FULL_INFO = 'RECEIVE_FULL_INFO';

export function requestFullInfo() {
  debugger;
  return {
    type: REQUEST_FULL_INFO
  };
}

export function receiveFullInfo(data) {
  debugger;
  return {
    type: RECEIVE_FULL_INFO,
    data
  };
}

export function fetchFullInfo() {
  return function (dispatch, getState) {
    dispatch(requestFullInfo());

    return fetch(`${BACKEND}/full`)
      .then(response => response.json())
      .then(json => dispatch(receiveFullInfo(json)));

      // TODO
      // ..
      // handle errors
  };
}
