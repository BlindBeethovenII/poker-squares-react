import {
  PLACE_CARD,
} from '../constants/hand';

import { cloneByJSON } from '../../useful-js-functions';
import { updateHandScores } from '../../card-functions';


const initialState = {
  placedCards: [],
  scoresCols: [],
  scoresRows: [],
  scoreTotal: 0,
};

export default function(state = initialState, action = '') {
  switch (action.type) {
    case PLACE_CARD:
        let placedCards = cloneByJSON(state.placedCards);
        let {col, row, card} = action;
        placedCards[col][row] = {suit:card.suit, number:card.number};
        const { scoresCols, scoresRows, scoreTotal } = updateHandScores(col, row, state.scoresCols, state.scoresRows, placedCards);
        return {
            ...state,
            placedCards,
            scoresRows,
            scoresCols,
            scoreTotal,
        };

    default:
        return state;
  }
}
