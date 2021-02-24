import { combineReducers } from 'redux';

import deal from './deal';
import hand from './hand';

export default combineReducers({
  deal,
  hand,
});
