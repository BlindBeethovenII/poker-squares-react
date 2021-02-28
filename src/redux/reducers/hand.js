import { RESET_HAND, PLACE_CARD } from '../constants/hand';
import { cloneByJSON } from '../../useful-js-functions';
import { updateHandScores } from '../../shared/card-functions';
import { CARD_NONE } from '../../shared/constants';

// helper functions for the initial state and resetHand
const newPlacedCards = () => [
  [CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE],
  [CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE],
  [CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE],
  [CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE],
  [CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE],
];

const newScoresRows = () => [0, 0, 0, 0, 0];

const newScoresCols = () => [0, 0, 0, 0, 0];

export const initialState = {
  placedCards: newPlacedCards(),
  scoresRows: newScoresRows(),
  scoresCols: newScoresCols(),
  scoreTotal: 0,
};

const resetHand = (state) => ({
  ...state,
  placedCards: newPlacedCards(),
  scoresRows: newScoresRows(),
  scoresCols: newScoresCols(),
  scoreTotal: 0,
});

const placeCard = (state, action) => {
  const placedCards = cloneByJSON(state.placedCards);
  const { col, row, card } = action;
  placedCards[col][row] = { suit: card.suit, number: card.number };
  const { scoresCols, scoresRows, scoreTotal } = updateHandScores(
    col,
    row,
    state.scoresCols,
    state.scoresRows,
    placedCards,
  );
  return {
    ...state,
    placedCards,
    scoresRows,
    scoresCols,
    scoreTotal,
  };
};

const reducer = (state = initialState, action = '') => {
  switch (action.type) {
    case RESET_HAND:
      return resetHand(state);

    case PLACE_CARD:
      return placeCard(state, action);

    default:
      return state;
  }
};

export default reducer;
