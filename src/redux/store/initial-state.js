// the initial state for a game

import { initialState as dealInitialState } from '../reducers/deal';

export default function initialState() {
  return {
    deal: dealInitialState,
  };
}
