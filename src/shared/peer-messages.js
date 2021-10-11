// constructors for the peer messages

const NEW_GAME = 'NEW_GAME';
const OPPONENT_NAME = 'OPPONENT_NAME';

export const createNewGameMessage = (name, deck) => ({ type: NEW_GAME, name, deck });
export const createOpponentNameMessage = (name) => ({ type: OPPONENT_NAME, name });

export const isNewGameMessage = (message) => message.type === NEW_GAME;
export const isOpponentNameMessage = (message) => message.type === OPPONENT_NAME;

export const getDeckFromMessage = (message) => message.deck;
export const getNameFromMessage = (message) => message.name;
