import { combineReducers } from 'redux';

// import all other reducers
import FormulaOneApp from './Reducers';

const FullApp = combineReducers({
  FormulaOneApp,
  // More reducers here
});

export default FullApp;
