import NetworkService from '../helpers/NetworkService';
/*
 * action types
 */

// export const ADD_TODO = 'ADD_TODO'
// export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SELECT_ACTIVE_YEAR = 'SELECT_ACTIVE_YEAR';
export const REQUEST_CHAMPIONS = 'REQUEST_CHAMPIONS';
export const RECEIVE_CHAMPIONS = 'RECEIVE_CHAMPIONS';
export const INVALIDATE_YEAR_RANGE = 'INVALIDATE_YEAR_RANGE';
export const SET_YEAR_RANGE = 'SET_YEAR_RANGE';

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
export const invalidateYearRange = yearRange => {
  return { type: INVALIDATE_YEAR_RANGE, yearRange }
}

export const selectActiveYear = year => {
  return { type: SELECT_ACTIVE_YEAR, year }
}

export const setYearRange = yearRange => {
  return { type: SET_YEAR_RANGE, yearRange }
}

export const requestChampions = (yearRange) => {
  return {
    type: REQUEST_CHAMPIONS,
    yearRange
  }
}
export const receiveRaces = (year, json) => {
  return {
    type: RECEIVE_RACES,
    yearRange,
    data: json.data, //.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

const fetchRacesByYear = year => dispatch => {
  dispatch(requestChampions(yearRange))
  return NetworkService.getChampionsFromYearRange(yearRange)
    .then(data => {
      let {
         MRData: {
           StandingsTable: {
             StandingsLists: arrayOfChampions
           }
       }
     } = data;
     console.log("DATA " + data);
     dispatch(receiveChampions(yearRange, arrayOfChampions));
   })
}

const shouldFetchChampions = (state, yearRange) => {
  const champions = state.championsByYearRange[yearRange]
  if (!champions) {
    return true
  }
  if (champions.isFetching) {
    return false
  }
  return champions.didInvalidate
}

export const fetchChampionsIfNeeded = yearRange => (dispatch, getState) => {
  if (shouldFetchChampions(getState(), yearRange)) {
    return dispatch(fetchChampions(yearRange))
  }
}
