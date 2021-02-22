import {
  SET_DECK,
  DEAL_NEXT_CARD,
} from '../constants/deal';



// action to set the initial deck
export function setDeck(deck = []) {
  return {
      type: SET_DECK,
      deck,
  }
}

// action to deal the next card
export function dealNextCard(col = 0, row = 0) {
  return {
      type: DEAL_NEXT_CARD,
      col,
      row,
  }
}
