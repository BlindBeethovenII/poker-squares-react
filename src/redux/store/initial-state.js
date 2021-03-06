// the initial state for a game

import { initialState as dealInitialState } from '../reducers/deal';
import { initialState as handInitialState } from '../reducers/hand';

export default function initialState() {
  return {
    deal: dealInitialState,
    hand: handInitialState,
  };
}
