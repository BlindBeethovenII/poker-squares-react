// the initial state for a game

import shuffle from 'lodash.shuffle';

import { 
    SUITS, 
    NUMBERS,
    CARD_NONE,
    DEAL_COL,
    DEAL_ROW,
} from '../../constants';

import { col2Left, row2Top } from '../../card-functions';


export default function initialState() {
    // put all the cards in the deck - all at , any order - we take them at random 
    let deck = [];
    SUITS.map((suit) => NUMBERS.map((number) => deck.push({suit, number, left:col2Left(DEAL_COL), top:row2Top(DEAL_ROW), id:`card_${suit}_${number}` })));
    deck = shuffle(deck);
    
    // we have no placed cards yet
    const placedCards = [
        [CARD_NONE,CARD_NONE,CARD_NONE,CARD_NONE,CARD_NONE],
        [CARD_NONE,CARD_NONE,CARD_NONE,CARD_NONE,CARD_NONE],
        [CARD_NONE,CARD_NONE,CARD_NONE,CARD_NONE,CARD_NONE],
        [CARD_NONE,CARD_NONE,CARD_NONE,CARD_NONE,CARD_NONE],
        [CARD_NONE,CARD_NONE,CARD_NONE,CARD_NONE,CARD_NONE],
    ];

    const scoresRows = [0, 0, 0, 0, 0];
    const scoresCols = [0, 0, 0, 0, 0];

    return {
        deal: {deck, currentCardIndex: 0},
        hand: {placedCards, scoresRows, scoresCols, scoreTotal: 0},
    };
};

