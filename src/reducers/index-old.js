import { combineReducers } from 'redux';

// import all other reducers
//
//

// import redux actions
import {
  SELECT_ACTIVE_YEAR, INVALIDATE_YEAR_RANGE,
  REQUEST_CHAMPIONS, RECEIVE_CHAMPIONS, SET_YEAR_RANGE
} from '../actions';

// CONSTANTS
const FROM_YEAR = 2005;
const TO_YEAR = 2015;
const ACTIVE_YEAR = TO_YEAR-(Math.round((TO_YEAR-FROM_YEAR)/2)); // Sets active year to median value of the range of years

const selectedYear = (state = ACTIVE_YEAR, action) => {
  switch (action.type) {
    case SELECT_ACTIVE_YEAR:
      return action.year
    default:
      return state
  }
}

const yearRange = (state = getArrayOfYears(), action) => {
  switch (action.type) {
    case SET_YEAR_RANGE:
      return action.yearRange
    default:
      return state
  }
}

const champions = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_YEAR_RANGE:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_CHAMPIONS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_CHAMPIONS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.champions,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

/// --- START HELPERS --- ///
function generateChampionsDataShape() {
  return getArrayOfYears().map((year) => {
    return Object.assign({}, {
      season: year.toString(),
        DriverStandings: [
        {
          Driver: {
            givenName: "",
            familyName: "",
          }
        }
        ]
    });
  })
}
function getArrayOfYears () {
  return Array.from(new Array(TO_YEAR-FROM_YEAR+1), (x,i) => i + FROM_YEAR);
}
/// --- END HELPERS --- ///
const championsByYearRange = (state = {
  items: generateChampionsDataShape(),
 }, action) => {
  switch (action.type) {
    case INVALIDATE_YEAR_RANGE:
    case RECEIVE_CHAMPIONS:
    case REQUEST_CHAMPIONS:
      return {
        ...state,
        [action.yearRange]: champions(state[action.yearRange], action)
      }
    default:
      return state
  }
}


const RootReducer = combineReducers({
  championsByYearRange,
  selectedYear,
  yearRange
  // More reducers here
});

export default RootReducer;
