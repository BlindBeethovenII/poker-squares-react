// constructors for the peer messages

const DECK = 'DECK';
const NAME = 'NAME';

export const createDeckMessage = (deck) => ({ type: DECK, deck });
export const createNameMessage = (name) => ({ type: NAME, name });

export const isDeckMessage = (message) => message.type === DECK;

export const getDeckFromMessage = (message) => message.deck;
