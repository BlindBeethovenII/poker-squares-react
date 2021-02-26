import shuffle from 'lodash.shuffle';

import { RESET_DECK, DEAL_NEXT_CARD } from '../constants/deal';
import { cloneByJSON } from '../../useful-js-functions';
import { col2Left, row2Top } from '../../card-functions';
import { SUITS, NUMBERS, DEAL_COL, DEAL_ROW } from '../../constants';

// helper function to create a suffled deck
const newDeckShuffled = () => {
  // put all the cards in the deck, placing at the dealing position
  let deck = [];
  SUITS.map((suit) =>
    NUMBERS.map((number) =>
      deck.push({ suit, number, left: col2Left(DEAL_COL), top: row2Top(DEAL_ROW), id: `card_${suit}_${number}` }),
    ),
  );

  // now shuffle them
  deck = shuffle(deck);

  return deck;
};

export const initialState = {
  deck: [], // start game with no deck dealt
  currentCardIndex: 0,
};

const resetDeck = (state) => ({
  ...state,
  deck: newDeckShuffled(),
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
    case RESET_DECK:
      return resetDeck(state);

    case DEAL_NEXT_CARD:
      return dealNextCard(state, action);

    default:
      return state;
  }
};

export default reducer;
