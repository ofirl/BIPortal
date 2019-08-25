import { combineReducers } from 'redux'
import data from './dataReducer';
import activeFilter from './activeFilterReducer';

export default combineReducers({
  data,
  activeFilter,
});