import { RESET_HAND, PLACE_CARD } from '../constants/hand';
import { SUIT_NONE, NUMBER_NONE } from '../../shared/constants';

// action to reset hand to its initial state
export const resetHand = () => ({
  type: RESET_HAND,
});

// action to place card in the hand

export const placeCard = (col = 0, row = 0, card = { suit: SUIT_NONE, number: NUMBER_NONE }) => ({
  type: PLACE_CARD,
  col,
  row,
  card,
});
