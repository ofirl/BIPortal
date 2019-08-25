import { combineReducers } from 'redux';
import data from './dataReducer';
import activeFilter from './activeFilterReducer';
import hierarchy from './hierarchyReducer';

export default combineReducers({
  data,
  activeFilter,
  hierarchy,
});