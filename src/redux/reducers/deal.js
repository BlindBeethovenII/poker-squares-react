import {
  SET_DECK,
  DEAL_NEXT_CARD,
} from '../constants/deal';

import { cloneByJSON } from '../../useful-js-functions';
import { col2Left, row2Top } from '../../card-functions';


const initialState = {
  deck: [],
  currentCardIndex: -1,
};

export default function(state = initialState, action = '') {
  switch (action.type) {
    case SET_DECK:
        return {
            ...state,
            deck: action.deck,
        };

    case DEAL_NEXT_CARD:
        // move current card to given col,row, and move current card to next
        let {col, row} = action;
        let deck = cloneByJSON(state.deck);
        let currentCardIndex = state.currentCardIndex;
        deck[currentCardIndex].left = col2Left(col);
        deck[currentCardIndex].top = row2Top(row);

        return {
            ...state,
            deck,
            currentCardIndex: currentCardIndex+1,
        };

    default:
        return state;
  }
}
