import { SET_DECK, DEAL_NEXT_CARD } from '../constants/deal';

// action to set the initial deck
export const setDeck = (deck = []) => ({
  type: SET_DECK,
  deck,
});

// action to deal the next card
export const dealNextCard = (col = 0, row = 0) => ({
  type: DEAL_NEXT_CARD,
  col,
  row,
});
