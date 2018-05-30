import { combineReducers } from 'redux';

import {leaves} from './leave.reducer';
import {popup} from './popup.reducer';


const rootReducer = combineReducers({
  popup,
  leaves
});

export default rootReducer;
