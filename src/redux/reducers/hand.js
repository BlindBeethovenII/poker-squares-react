import { PLACE_CARD } from '../constants/hand';
import { cloneByJSON } from '../../useful-js-functions';
import { updateHandScores } from '../../card-functions';

const initialState = {
  placedCards: [],
  scoresCols: [],
  scoresRows: [],
  scoreTotal: 0,
};

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
    case PLACE_CARD:
      return placeCard(state, action);

    default:
      return state;
  }
};

export default reducer;
