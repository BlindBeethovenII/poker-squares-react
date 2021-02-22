import {
    PLACE_CARD,
  } from '../constants/hand';
  
  import {
    SUIT_NONE,
    NUMBER_NONE,
  } from '../../constants';
  
 
 
  // action to place card in the hand
  export function placeCard(col = 0, row = 0, card = {suit: SUIT_NONE, number: NUMBER_NONE}) {
    return {
        type: PLACE_CARD,
        col,
        row,
        card,
      };
  }

  
  