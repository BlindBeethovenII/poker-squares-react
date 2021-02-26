// the initial state for a game

import { initialState as dealInitialState } from '../reducers/deal';
import { initialState as handInitialState } from '../reducers/hand';
import { initialState as uiInitialState } from '../reducers/ui';

export default function initialState() {
  return {
    deal: dealInitialState,
    hand: handInitialState,
    ui: uiInitialState,
  };
}
