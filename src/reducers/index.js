import { combineReducers } from 'redux';
import reducer from './reducer';
import ParserReducer from './ParserReducer';

const rootReducer = combineReducers({
  fetchReducer: reducer,
  parserReducer: ParserReducer
});

export default rootReducer;
