// the card placement algorithms that the A.I. opponent uses

import {
  SUIT_NONE,
  NUMBER_NONE,
  COL_NONE,
  ROW_NONE,
  ALGORITHM_FULL_HOUSES_THEN_FLUSHES,
  ALGORITHM_LAST_ROW_VERTICAL_THEN_FLUSHES_THEN_VERTICAL_NUMBERS,
} from './constants';

import { sortHand } from './card-functions';

// supporting functions for card placement

// NOTE: we cannot do "card === CARD_NONE" as we use cloneByJSON() for the placedCards which will create a new object
// So using a function which looks in the object for its suit/number
// This function assumes a card object is given
export const isCardNone = (card) => card.suit === SUIT_NONE && card.number === NUMBER_NONE;

// return true if this row has an empty space
const rowHasEmptySpace = (row, placedCards) => {
  for (let col = 0; col < 5; col += 1) {
    const card = placedCards[col][row];

    if (isCardNone(card)) {
      return true;
    }
  }

  return false;
};

// return true if this row has at most two numbers, including the given number
const rowHasMostTwoNumbers = (row, n, placedCards) => {
  let otherNumber = NUMBER_NONE;

  for (let col = 0; col < 5; col += 1) {
    const card = placedCards[col][row];

    if (!isCardNone(card)) {
      if (card.number === n) {
        // okay, it is our number
      } else if (otherNumber === NUMBER_NONE) {
        // this is the first occurance of another number
        otherNumber = card.number;
      } else if (card.number === otherNumber) {
        // this is the other number, okay
      } else {
        // nope - we have just met a 3rd number
        return false;
      }
    }
  }

  // if we get to here we did not meet a 3rd number, so okay
  return true;
};

// return true if this row cannot be a full house
const rowCannotBeFullHouse = (row, placedCards) => {
  // a row cannot be a full house if there are three different numbers in it
  let n1 = NUMBER_NONE;
  let n2 = NUMBER_NONE;

  for (let col = 0; col < 5; col += 1) {
    const card = placedCards[col][row];

    if (!isCardNone(card)) {
      if (n1 === NUMBER_NONE) {
        // this is the first number
        n1 = card.number;
      } else if (n1 === card.number) {
        // not a new number, okay
      } else if (n2 === NUMBER_NONE) {
        // this is the second number
        n2 = card.number;
      } else if (n2 === card.number) {
        // not a new number, okay
      } else {
        // we have three numbers, so cannot be a full house
        return true;
      }
    }
  }

  return false;
};

// return true if this row can still be a straight with card added
// note this is only called where the named row has at least one empty space
const rowCouldBeStraightWithCard = (row, card, placedCards) => {
  // easiest if we first sort the row

  // create a hand for this row
  const hand = [
    placedCards[0][row],
    placedCards[1][row],
    placedCards[2][row],
    placedCards[3][row],
    placedCards[4][row],
  ];

  // now sort it
  sortHand(hand);

  // put the card in and sort (last space must be null - see above note)
  hand[4] = card;
  sortHand(hand);

  // if repeated number, then it can't be a straight
  for (let col = 0; col < 4; col += 1) {
    if (!isCardNone(hand[col]) && !isCardNone(hand[col + 1])) {
      if (hand[col].number === hand[col + 1].number) {
        return false;
      }
    }
  }

  // the first to last can be at most 4 difference in number
  // we know there is at least 1 card in the hand at this point
  const lowest = hand[0].number;
  let highest = -1;
  for (let col = 4; col >= 0; col -= 1) {
    if (!isCardNone(hand[col])) {
      highest = hand[col].number;
      break;
    }
  }

  if (highest - lowest <= 4) {
    return true;
  }

  // also need to cope with A 10 J Q K
  // if current cards are just 10 J Q K or part of them then the above has already returned true, so A must be in as the lowest
  // and for it to be possible for a straight, the 2nd card must be a 10 or higher (as there are no repeated cards at this point)
  // there must be at least a second card otherwise above would have return true by now, so remaining cards must be 10 J Q K or missing
  if (lowest === 1 && hand[1].number >= 10) {
    // okay, can be straight
    return true;
  }

  // nope, cannot be a straight
  return false;
};

// return true if this row cannot be a straight
const rowCannotBeStraight = (row, placedCards) => {
  // easiest if we first sort the row

  // create a hand for this row
  const hand = [
    placedCards[0][row],
    placedCards[1][row],
    placedCards[2][row],
    placedCards[3][row],
    placedCards[4][row],
  ];

  // now sort it
  sortHand(hand);

  // if no cards, then it can still be a straight
  if (isCardNone(hand[0])) {
    return false;
  }

  // if repeated number, then it can't be a straight
  for (let col = 0; col < 4; col += 1) {
    if (!isCardNone(hand[col]) && !isCardNone(hand[col + 1])) {
      if (hand[col].number === hand[col + 1].number) {
        return true;
      }
    }
  }

  // the first to last can be at most 4 difference in number for it to be a straight
  // we know there is at least 1 card in the hand at this point
  const lowest = hand[0].number;
  let highest = -1;
  for (let col = 4; col >= 0; col -= 1) {
    if (!isCardNone(hand[col])) {
      highest = hand[col].number;
      break;
    }
  }

  if (highest - lowest <= 4) {
    // can be a straight
    return false;
  }

  // also need to cope with A 10 J Q K
  // if current cards are just 10 J Q K or part of them then the above has already returned true, so A must be in as the lowest
  // and for it to be possible for a straight, the 2nd card must be a 10 or higher (as there are no repeated cards at this point)
  // there must be at least a second card otherwise above would have return true by now, so remaining cards must be 10 J Q K or missing
  if (lowest === 1 && hand[1].number >= 10) {
    // okay, can be straight
    return false;
  }

  return true;
};

// return the number of cards in the given row
const countCardsInRow = (row, placedCards) => {
  let result = 0;
  for (let col = 0; col < 5; col += 1) {
    if (!isCardNone(placedCards[col][row])) {
      result += 1;
    }
  }
  return result;
};

// return the row with the least number of cards in (and hence most spaces)
const rowWithLeastCards = (placedCards) => {
  let result = ROW_NONE;
  let count = 100;

  for (let row = 0; row < 5; row += 1) {
    const thisCount = countCardsInRow(row, placedCards);

    // if we have 0 then can't get lower than that
    if (thisCount === 0) {
      return row;
    }

    // if less than previous, remember
    if (thisCount < count) {
      count = thisCount;
      result = row;
    }
  }

  // result must be defined by now
  if (result === ROW_NONE) {
    throw new Error('result still -1 in rowWithLeastCards');
  }

  return result;
};

// return true if this row only has cards of the named suite or empty spaces
const isRowOfSuit = (row, suit, placedCards) => {
  for (let col = 0; col < 5; col += 1) {
    const card = placedCards[col][row];

    if (!isCardNone(card) && card.suit !== suit) {
      return false;
    }
  }

  return true;
};

// return true if this col only has cards of the named suite or empty spaces
const isColOfSuit = (col, suit, placedCards) => {
  for (let row = 0; row < 5; row += 1) {
    const card = placedCards[col][row];

    if (!isCardNone(card) && card.suit !== suit) {
      return false;
    }
  }

  return true;
};

// return true if the given column has a card of the given number
const colHasNumber = (col, n, placedCards) => {
  for (let row = 0; row < 5; row += 1) {
    const card = placedCards[col][row];

    if (!isCardNone(card) && card.number === n) {
      return true;
    }
  }

  return false;
};

// return true if the given column has a card of the given suit
const colHasSuit = (col, suit, placedCards) => {
  for (let row = 0; row < 5; row += 1) {
    const card = placedCards[col][row];

    if (!isCardNone(card) && card.suit === suit) {
      return true;
    }
  }

  return false;
};

// return the number of cards in the given column
const countCardsInCol = (col, placedCards) => {
  let result = 0;
  for (let row = 0; row < 5; row += 1) {
    if (!isCardNone(placedCards[col][row])) {
      result += 1;
    }
  }
  return result;
};

// return the column index of the column with the least number of cards in, which has a space in the given row
const colWithLeastCards = (row, placedCards) => {
  let resultCol = COL_NONE;
  let resultCount = 100;

  for (let col = 0; col < 5; col += 1) {
    if (isCardNone(placedCards[col][row])) {
      const thisCount = countCardsInCol(col, placedCards);

      // if we have 0 then can't get lower than that
      if (thisCount === 0) {
        return col;
      }

      // if less than previous, remember
      if (thisCount < resultCount) {
        resultCount = thisCount;
        resultCol = col;
      }
    }
  }

  // resultCol must be defined by now, as we can only be called if there is space in the row
  if (resultCol === COL_NONE) {
    throw new Error('resultCol still -1 in colWithLeastCards');
  }

  return resultCol;
};

// algorithm 0 covers FlushesAndVerticalNumbers and LastRowVerticalThenFlushesThenVerticalNumbers
export const placeCardByAlgorithm0 = (card, placedCards, algorithm) => {
  // start with no selection
  let coord = { col: COL_NONE, row: ROW_NONE };

  if (algorithm === ALGORITHM_LAST_ROW_VERTICAL_THEN_FLUSHES_THEN_VERTICAL_NUMBERS) {
    // look for the column that has this number in, and if it already has an entry of this suite and the last entry is free, put this card in the last entry
    for (let col = 0; col < 5; col += 1) {
      if (colHasNumber(col, card.number, placedCards)) {
        if (colHasSuit(col, card.suit, placedCards)) {
          if (isCardNone(placedCards[col][4])) {
            coord = { col, row: 4 };
            break;
          }
        }
      }
    }
  }

  // find a row that is of this suit and has an empty space in it
  if (coord.row === ROW_NONE) {
    for (let row = 0; row < 5; row += 1) {
      if (rowHasEmptySpace(row, placedCards)) {
        if (isRowOfSuit(row, card.suit, placedCards)) {
          // found the row
          coord.row = row;
          break;
        }
      }
    }
  }

  // if we did not find such a row, just find the last row with a space in it
  if (coord.row === ROW_NONE) {
    for (let row = 4; row >= 0; row -= 1) {
      if (rowHasEmptySpace(row, placedCards)) {
        // found the row
        coord.row = row;
        break;
      }
    }
  }

  // we should have found a row by now
  if (coord.row === ROW_NONE) {
    throw new Error('Could not find row in placeCardByAlgorithm0');
  }

  // this algorithm tries to align numbers virtically
  // look for a space that has this number
  if (coord.col === COL_NONE) {
    for (let col = 0; col < 5; col += 1) {
      if (isCardNone(placedCards[col][coord.row])) {
        if (colHasNumber(col, card.number, placedCards)) {
          // found the column
          coord.col = col;
          break;
        }
      }
    }
  }

  // if not found a matching column for this number, place in column with zero or one other card, else in column with least number of cards in already (that is a space)
  if (coord.col === COL_NONE) {
    coord.col = colWithLeastCards(coord.row, placedCards);
  }

  // we should have found a column by now
  if (coord.col === COL_NONE) {
    throw new Error('Could not find column in placeCardByAlgorithm0');
  }

  // we now know where to place the card
  return coord;
};

// algorithm 1 covers FullHousesThenPairs and FullHousesThenFlushes
export const placeCardByAlgorithm1 = (card, placedCards, algorithm) => {
  // start with no selection
  const coord = { col: COL_NONE, row: ROW_NONE };

  // try and find a row with at most two numbers, including this one
  for (let row = 0; row < 5; row += 1) {
    if (rowHasEmptySpace(row, placedCards)) {
      if (rowHasMostTwoNumbers(row, card.number, placedCards)) {
        // found the row
        coord.row = row;
        break;
      }
    }
  }

  // if we did not find such a row, then go for the row that is already unable to make a full house, that still has an empty space, starting from the bottom
  if (coord.row === ROW_NONE) {
    for (let row = 4; row >= 0; row -= 1) {
      if (rowHasEmptySpace(row, placedCards)) {
        if (rowCannotBeFullHouse(row, placedCards)) {
          // use this row
          coord.row = row;
          break;
        }
      }
    }
  }

  // if we did not find such a row, then all rows can be full houses and this card will spoil it, select row with most number of spaces/least cards
  if (coord.row === ROW_NONE) {
    coord.row = rowWithLeastCards(placedCards);
  }

  // we should have found a row by now
  if (coord.row === ROW_NONE) {
    throw new Error('Could not find row in placeCardByAlgorithm1');
  }

  // if we are the flushes algorithm then first look for a column for this suit
  if (coord.col === COL_NONE && algorithm === ALGORITHM_FULL_HOUSES_THEN_FLUSHES) {
    for (let col = 0; col < 5; col += 1) {
      if (isCardNone(placedCards[col][coord.row])) {
        if (isColOfSuit(col, card.suit, placedCards)) {
          // found the column
          coord.col = col;
          break;
        }
      }
    }
  }

  // otherwise try to align numbers virtically (though this will have less meaning as full houses are across and so less chance this number is vertical)
  // look for a space that has this number
  if (coord.col === COL_NONE) {
    for (let col = 0; col < 5; col += 1) {
      if (isCardNone(placedCards[col][coord.row])) {
        if (colHasNumber(col, card.number, placedCards)) {
          // found the column
          coord.col = col;
          break;
        }
      }
    }
  }

  // if not found a matching column for this number, place in column with zero or one other card, else in column with least number of cards in already (that is a space)
  if (coord.col === COL_NONE) {
    coord.col = colWithLeastCards(coord.row, placedCards);
  }

  // we should have found a column by now
  if (coord.col === COL_NONE) {
    throw new Error('Could not find column in placeCardByAlgorithm1');
  }

  // we now know where to place the card
  return coord;
};

// algorithm 2 covers StraightsThenPairs
export const placeCardByAlgorithm2 = (card, placedCards) => {
  // start with no selection
  const coord = { col: COL_NONE, row: ROW_NONE };

  // try and find a row where adding this number keeps it as a straight
  for (let row = 0; row < 5; row += 1) {
    if (rowHasEmptySpace(row, placedCards)) {
      if (rowCouldBeStraightWithCard(row, card, placedCards)) {
        // found the row
        coord.row = row;
        break;
      }
    }
  }

  // if we did not find such a row, then go for the row that is already unable to make a straight, that still has an empty space, starting from the bottom
  if (coord.row === ROW_NONE) {
    for (let row = 4; row >= 0; row -= 1) {
      if (rowHasEmptySpace(row, placedCards)) {
        if (rowCannotBeStraight(row, placedCards)) {
          // use this row
          coord.row = row;
          break;
        }
      }
    }
  }

  // if we did not find such a row, then go for the row with the most spaces in, as it is less likely to be about to complete a straight
  if (coord.row === ROW_NONE) {
    coord.row = rowWithLeastCards(placedCards);
  }

  // we should have found a row by now
  if (coord.row === ROW_NONE) {
    throw new Error('Could not find row in placeCardByAlgorithm2');
  }

  // this algorithm tries to align numbers virtically, so look for a space that has this number
  if (coord.col === COL_NONE) {
    for (let col = 0; col < 5; col += 1) {
      if (isCardNone(placedCards[col][coord.row])) {
        if (colHasNumber(col, card.number, placedCards)) {
          // found the column
          coord.col = col;
          break;
        }
      }
    }
  }

  // if not found a matching column for this number, place in column with zero or one other card, else in column with least number of cards in already (that is a space)
  if (coord.col === COL_NONE) {
    coord.col = colWithLeastCards(coord.row, placedCards);

    // TODO: Would be better to look for the least spoilt card, that leaves the best potential - apply this to all algorithms
  }

  // we should have found a column by now
  if (coord.col === COL_NONE) {
    throw new Error('Could not find column in placeCardByAlgorithm2');
  }

  // we now know where to place the card
  return coord;
};
