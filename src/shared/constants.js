export const CARD_WIDTH = 68;
export const CARD_HEIGHT = 86;

export const SUIT_SPADES = 'S';
export const SUIT_HEARTS = 'H';
export const SUIT_DIAMONDS = 'D';
export const SUIT_CLUBS = 'C';
export const SUITS = [SUIT_SPADES, SUIT_HEARTS, SUIT_DIAMONDS, SUIT_CLUBS];
export const SUIT_NONE = 'NONE';

export const NUMBER_A = 1;
export const NUMBER_2 = 2;
export const NUMBER_3 = 3;
export const NUMBER_4 = 4;
export const NUMBER_5 = 5;
export const NUMBER_6 = 6;
export const NUMBER_7 = 7;
export const NUMBER_8 = 8;
export const NUMBER_9 = 9;
export const NUMBER_10 = 10;
export const NUMBER_J = 11;
export const NUMBER_Q = 12;
export const NUMBER_K = 13;
export const NUMBERS = [
  NUMBER_A,
  NUMBER_2,
  NUMBER_3,
  NUMBER_4,
  NUMBER_5,
  NUMBER_6,
  NUMBER_7,
  NUMBER_8,
  NUMBER_9,
  NUMBER_10,
  NUMBER_J,
  NUMBER_Q,
  NUMBER_K,
];
export const NUMBER_NONE = -1;

export const CARD_NONE = { suit: SUIT_NONE, number: NUMBER_NONE };

export const GRID_INDEXES = [0, 1, 2, 3, 4];

export const DEAL_COL = 6;
export const DEAL_ROW = 2;

export const ALGORITHM_FULL_HOUSES_THEN_PAIRS = 'ALG_FHTP';
export const ALGORITHM_FULL_HOUSES_THEN_FLUSHES = 'ALG_FHTF';
export const ALGORITHM_FLUSHES_THEN_VERTICAL_NUMBERS = 'ALG_FTVN';
export const ALGORITHM_LAST_ROW_VERTICAL_THEN_FLUSHES_THEN_VERTICAL_NUMBERS = 'ALG_LRVTFTVN';
export const ALGORITHM_STRAIGHTS_THEN_PAIRS = 'ALG_STP';

export const COL_NONE = -1;
export const ROW_NONE = -1;

export const OPPONENT_TYPE_HUMAN = 'HUMAN';
export const OPPONENT_TYPE_AI = 'AI';
