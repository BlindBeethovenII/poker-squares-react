import { SET_DECK, RESET_DECK, DEAL_NEXT_CARD } from '../constants/deal';
import { cloneByJSON } from '../../useful-js-functions';
import { col2Left, row2Top, createShuffledDeck } from '../../shared/card-functions';

export const initialState = {
  deck: [], // start game with no deck dealt
  currentCardIndex: 0,
};

const setDeck = (state, action) => ({
  ...state,
  deck: action.deck,
  currentCardIndex: 0,
});

const resetDeck = (state) => ({
  ...state,
  deck: createShuffledDeck(),
  currentCardIndex: 0,
});

const dealNextCard = (state, action) => {
  // move current card to given col,row, and move current card to next
  const { deck, currentCardIndex } = state;
  const { col, row } = action;
  const deckNew = cloneByJSON(deck);
  deckNew[currentCardIndex].left = col2Left(col);
  deckNew[currentCardIndex].top = row2Top(row);

  return {
    ...state,
    deck: deckNew,
    currentCardIndex: currentCardIndex + 1,
  };
};

const reducer = (state = initialState, action = '') => {
  switch (action.type) {
    case SET_DECK:
      return setDeck(state, action);

    case RESET_DECK:
      return resetDeck(state);

    case DEAL_NEXT_CARD:
      return dealNextCard(state, action);

    default:
      return state;
  }
};

export default reducer;
