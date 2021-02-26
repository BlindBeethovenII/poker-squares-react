import { RESET_DECK, DEAL_NEXT_CARD } from '../constants/deal';

// action to reset desk to its initial state, with a random dealt hand
export const resetDeck = () => ({
  type: RESET_DECK,
});

// action to deal the next card
export const dealNextCard = (col = 0, row = 0) => ({
  type: DEAL_NEXT_CARD,
  col,
  row,
});
