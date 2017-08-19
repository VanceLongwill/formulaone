/*
 * action types
 */

// export const ADD_TODO = 'ADD_TODO'
// export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_ACTIVE_YEAR = 'SET_ACTIVE_YEAR';
export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'

/*
 * other constants
 */

// export const VisibilityFilters = {
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
//   SHOW_ACTIVE: 'SHOW_ACTIVE'
// }

/*
 * action creators
 */

export const setActiveYear = year => {
  return { type: SET_ACTIVE_YEAR, year }
}

export const requestData = (yearRange) => {
  return {
    type: REQUEST_DATA,
    yearRange
  }
}

export const receiveData = (yearRange, json) => {
  return {
    type: RECEIVE_DATA,
    yearRange,
    data: json.data, //.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
