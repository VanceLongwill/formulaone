import {
  SET_ACTIVE_YEAR,
} from '../actions';
import { combineReducers } from 'redux';

const FROM_YEAR = 2005;
const TO_YEAR = 2015;


const ACTIVE_YEAR = TO_YEAR-(Math.round((TO_YEAR-FROM_YEAR)/2)); // Sets active year to median value of the range of years

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

const initialState = {
  activeYear: ACTIVE_YEAR,
  yearRange: [FROM_YEAR, TO_YEAR],
  races: [],
  championsData: generateChampionsDataShape(),
}

function FormulaOneApp(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_YEAR:
      return Object.assign({}, state, {
        activeYear: action.filter
      })
    default:
      return state
  }
}

// const FormulaOneApp = combineReducers({
//   visibilityFilter,
//   todos
// })

export default FormulaOneApp;
