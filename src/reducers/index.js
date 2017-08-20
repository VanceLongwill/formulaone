import { combineReducers } from 'redux';
import {
  SELECT_YEAR, INVALIDATE_YEAR,
  REQUEST_RACES, RECEIVE_RACES, INVALIDATE_RACES,
  REQUEST_CHAMPIONS,
  RECEIVE_CHAMPIONS,
  INVALIDATE_CHAMPIONS,
  SELECTED_YEAR_RANGE,
} from '../actions';

// App-wide constants
import {
  DEFAULT_ACTIVE_YEAR,
  STARTING_YEAR,
  ENDING_YEAR,
} from '../config';
//
// const selectYear = (state = {
//    DEFAULT_ACTIVE_YEAR
// }, action) => {
//   switch (action.type) {
//     case SELECT_YEAR:
//     console.log("IN REDUCER")
//     console.log(action)
//       return action.year
//     default:
//       return state
//   }
// }


const selectedYear = (state = DEFAULT_ACTIVE_YEAR, action) => {
  switch (action.type) {
    case SELECT_YEAR:
    console.log("IN REDUCER")
    console.log(action)
      return action.year
    default:
      return state
  }
}

const races = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_RACES:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_RACES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_RACES:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.races,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}


const racesByYear = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_YEAR:
    case RECEIVE_RACES:
    case REQUEST_RACES:
      return {
        ...state,
        [action.year]: races(state[action.year], action)
      }
    default:
      return state
  }
}

const champions = (state = {
  initialFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_CHAMPIONS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_CHAMPIONS:
      return {
        ...state,
        initialFetching: true,
        didInvalidate: false
      }
    case RECEIVE_CHAMPIONS:
      return {
        ...state,
        initialFetching: false,
        didInvalidate: false,
        items: action.champions,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}


const selectedYearRange = (state = [STARTING_YEAR, ENDING_YEAR], action) => {
  switch (action.type) {
    case SELECTED_YEAR_RANGE:
      return action.yearRange
    default:
      return state
  }
}


const worldChampionsByYear = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_CHAMPIONS:
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

const rootReducer = combineReducers({
  racesByYear,
  selectedYear,
  selectedYearRange,
  worldChampionsByYear,
})

export default rootReducer;
