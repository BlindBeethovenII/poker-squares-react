// constructors for the peer messages

const NEW_GAME = 'NEW_GAME';
const OPPONENT_NAME = 'OPPONENT_NAME';
const PLACE_CARD = 'PLACE_CARD';
const RESET_GAME = 'RESET_GAME';

export const createNewGameMessage = (name, deck) => ({ type: NEW_GAME, name, deck });
export const createOpponentNameMessage = (name) => ({ type: OPPONENT_NAME, name });
export const createPlaceCardMessage = (col, row, suit, number) => ({
  type: PLACE_CARD,
  col,
  row,
  suit,
  number,
});
export const createResetGameMessage = (deck) => ({ type: RESET_GAME, deck });

export const isNewGameMessage = (message) => message.type === NEW_GAME;
export const isOpponentNameMessage = (message) => message.type === OPPONENT_NAME;
export const isPlaceCardMessage = (message) => message.type === PLACE_CARD;
export const isResetGameMessage = (message) => message.type === RESET_GAME;

export const getDeckFromMessage = (message) => message.deck;
export const getNameFromMessage = (message) => message.name;
export const getColFromMessage = (message) => message.col;
export const getRowFromMessage = (message) => message.row;
export const getSuitFromMessage = (message) => message.suit;
export const getNumberFromMessage = (message) => message.number;
