import { combineReducers } from 'redux';

import deal from './deal';
import hand from './hand';
import ui from './ui';

export default combineReducers({
  deal,
  hand,
  ui,
});
