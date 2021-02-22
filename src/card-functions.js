// useful card functions

import { 
    CARD_WIDTH, 
    CARD_HEIGHT,
  
    SUIT_NONE,
} from './constants';
  

// calc left based on given column
export function col2Left(col) {
    return 21+(col*CARD_WIDTH);
};

// calc top based on given row
export function row2Top(row) {
    return 20+(row*CARD_HEIGHT);
};

// select a card at random from the given deck, returning the card, and the new deck
export function selectRandomCardFromDeck(deck) {
    var randomIndex = Math.floor(Math.random()*deck.length);
    var card = deck[randomIndex];
    var newDeck = deck.filter((value, index) => index !== randomIndex);
    return {card, newDeck};
};

// update hand scores for the card just places at (col, row)
// code converted from C#
export function updateHandScores(col, row, scoresCols, scoresRows, placedCards) {
    // first copy the two score arrays, as we are updating them here
    scoresCols = scoresCols.slice(0);
    scoresRows = scoresRows.slice(0);
    
    // the 5 cards that are to be scored
    let hand = [];

    // do the row first
    for (let i = 0; i < 5; i++) {
        hand.push(placedCards[i][row]);
    }
    // sort and score the hand
    sortHand(hand);
    scoresRows[row] = scoreHand(hand);
    
    // now the column
    hand = [];
    for (let i = 0; i < 5; i++) {
        hand.push(placedCards[col][i]);
    }
    // sort and score the hand
    sortHand(hand);
    scoresCols[col] = scoreHand(hand);
    
    // calculate the new total
    let scoreTotal = 0;
    for (let i = 0; i < scoresRows.length; i++) {
        scoreTotal += (scoresRows[i] + scoresCols[i]);
    }

    return {
        scoresCols, 
        scoresRows, 
        scoreTotal,
    };
};

// sort the hand, putting 'NONE' cards at the end
function sortHand(hand) {
    // do bubble sort to order the cards, coping with 'NONE' cards
    for (let length = 5; length > 1; length--) {
        // move the biggest card from first entry to length
        for (let i = 0; i < length - 1; i++) {
            let swap = false;
            // if the next card is 'NONE', then don't need to swap as this can't be bigger
            if (hand[i + 1].suit === SUIT_NONE) {
                swap = false;
            }
            else if (hand[i].suit === SUIT_NONE) {
                // if this card is null, then we want to swap as it is "bigger" than the next
                swap = true;
            }
            else if (hand[i].number > hand[i + 1].number) {
                // both cards defined, and this one is bigger than next, so swap
                swap = true;
            }
            if (swap) {
                // this is bigger move it up
                const card = hand[i + 1];
                hand[i + 1] = hand[i];
                hand[i] = card;
            }
        }
    }
}

// score the given sorted hand (up to 5 cards)
function scoreHand(hand) {
    // work out if the hand is a flush, being 5 cards of the same suit
    const isFlush = handIsFlush(hand);

    // work out if the hand is a straight, being 5 cards of consequtive numbers
    const isStraight = handIsStraight(hand);

    if (isFlush && isStraight) {
        // straight flush
        return 30;
    }

    if (isStraight) {
        // straight
        return 12;
    }

    if (isFlush) {
        // flush
        return 5;
    }

    const longestNumber = handLongestNumber(hand);
    if (longestNumber === 4) {
        // four of a kind
        return 16;
    }

    if (handIsFullHouse(hand)) {
        // full house
        return 10;
    }

    if (longestNumber === 3) {
        // three of a kind
        return 6;
    }

    if (handIsTwoPairs(hand)) {
        // two pairs
        return 3;
    }

    if (longestNumber === 2) {
        // one pairs
        return 1;
    }

    // no scoring hand
    return 0;
}

// return true if the hand is 5 cards of the same suit
function handIsFlush(hand) {
    // first card
    const firstCard = hand[0];
    if (firstCard.suit === SUIT_NONE) {
        return false;
    }
    for (let i = 1; i < 5; i++) {
        const nextCard = hand[i];
        if (nextCard.suit === SUIT_NONE) {
            return false;
        }
        if (nextCard.suit !== firstCard.suit) {
            return false;
        }
    }
    return true;
}

// return true if the sorted hand is a straight
function handIsStraight(sortedHand) {
    // it can't be a straight if it has a NONE card in it (which must be the last one)
    if (sortedHand[4].suit === SUIT_NONE) {
        return false;
    }

    // all cards are defined, so easy to see if they are a straight
    if (sortedHand[0].number === sortedHand[1].number - 1 &&
        sortedHand[1].number === sortedHand[2].number - 1 &&
        sortedHand[2].number === sortedHand[3].number - 1 &&
        sortedHand[3].number === sortedHand[4].number - 1) {
        return true;
    }
    // don't forget 10 J Q K A, which will be A 10 J Q K in sorted!
    else if (sortedHand[0].number === 1 &&
             sortedHand[1].number === 10 &&
             sortedHand[2].number === 11 &&
             sortedHand[3].number === 12 &&
             sortedHand[4].number === 13) {
        return true;
    }
    else {
        return false;
    }
}

// return the length of the longest number in the sorted hand
function handLongestNumber(sortedHand) {
    let longestCount = 0;
    let currentCount = 0;
    let currentCard = sortedHand[0];
    // if no first card then 0 longest
    if (currentCard.suit === SUIT_NONE) {
        return 0;
    }
    // we have a card
    currentCount = 1;

    for (let i = 1; i < 5; i++) {
        const nextCard = sortedHand[i];

        // only interested if this is a card
        if (nextCard.suit !== SUIT_NONE) {
            // if same as previous increment
            if (nextCard.number === currentCard.number) {
                // same number
                currentCount++;
            }
            else {
                // we are moving to the next, see if current is a longer
                if (currentCount > longestCount) {
                        longestCount = currentCount;
                }
                currentCard = nextCard;
                currentCount = 1;
            }
        }
    }

    // check one we have been working on
    if (currentCount > longestCount) {
        longestCount = currentCount;
    }

    return longestCount;
}

// return true if the sorted hand is a full house
function handIsFullHouse(sortedHand) {
    // it can't be a full house if it has a NONE card in it (which must be the last one)
    if (sortedHand[4].suit === SUIT_NONE) {
        return false;
    }

    // to be a full house it must be 2 of same followed by 3 of same, or 3 of same followed by 2 of same
    if (sortedHand[0].number === sortedHand[1].number &&
        sortedHand[2].number === sortedHand[3].number &&
        sortedHand[3].number === sortedHand[4].number) {
        return true;
    }
    if (sortedHand[0].number === sortedHand[1].number &&
        sortedHand[1].number === sortedHand[2].number &&
        sortedHand[3].number === sortedHand[4].number) {
        return true;
    }

    return false;
}

// return true if the sorted hand is two pairs
function handIsTwoPairs(sortedHand) {
    // it can't be a two pairs if has 2 null cards (remember they are sorted)
    if (sortedHand[3].suit === SUIT_NONE) {
        return false;
    }

    // to be a two pairs it must be 2,2,null or 2,2,1 (same test) or 2,1,2 or 1,2,2
    if (sortedHand[0].number === sortedHand[1].number &&
        sortedHand[2].number === sortedHand[3].number) {
        return true;
    }
    // these last two cases require all 5 cards to be present
    if (sortedHand[4] == null) {
        return false;
    }
    if (sortedHand[0].number === sortedHand[1].number &&
        sortedHand[3].number === sortedHand[4].number) {
        return true;
    }
    if (sortedHand[1].number === sortedHand[2].number &&
        sortedHand[3].number === sortedHand[4].number) {
        return true;
    }

    return false;
}
