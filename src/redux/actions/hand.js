import { PLACE_CARD } from '../constants/hand';
import { SUIT_NONE, NUMBER_NONE } from '../../constants';

// action to place card in the hand
// eslint-disable-next-line import/prefer-default-export
export const placeCard = (col = 0, row = 0, card = { suit: SUIT_NONE, number: NUMBER_NONE }) => ({
  type: PLACE_CARD,
  col,
  row,
  card,
});
