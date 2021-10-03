import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { CARD_NONE } from '../shared/constants';
import { cloneByJSON } from '../useful-js-functions';
import { updateHandScores, col2Left, row2Top, createShuffledDeck } from '../shared/card-functions';

const GameStateContext = React.createContext({});

// helper functions for the initial state and resetHand
const emptyPlacedCards = () => [
  [CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE],
  [CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE],
  [CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE],
  [CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE],
  [CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE, CARD_NONE],
];

const emptyScoresRows = () => [0, 0, 0, 0, 0];

const emptyScoresCols = () => [0, 0, 0, 0, 0];

export const GameStateContextProvider = ({ children }) => {
  // the main menu open state bool and functions
  const [mainMenuOpen, setMainMenuOpen] = useState(true);
  const openMainMenu = () => setMainMenuOpen(true);
  const closeMainMenu = () => setMainMenuOpen(false);

  // the host peer game open state bool and functions
  const [hostPeerGameOpen, setHostPeerGameOpen] = useState(false);
  const openHostPeerGame = () => setHostPeerGameOpen(true);
  const closeHostPeerGame = () => setHostPeerGameOpen(false);

  // the join peer game open state bool and functions
  const [joinPeerGameOpen, setJoinPeerGameOpen] = useState(false);
  const openJoinPeerGame = () => setJoinPeerGameOpen(true);
  const closeJoinPeerGame = () => setJoinPeerGameOpen(false);

  // the placed cards
  const [placedCards, setPlacedCards] = useState(emptyPlacedCards());
  const [opponentPlacedCards, setOpponentPlacedCards] = useState(emptyPlacedCards());

  // the scores by row
  const [scoresRows, setScoresRows] = useState(emptyScoresRows());
  const [opponentScoresRows, setOpponentScoresRows] = useState(emptyScoresRows());

  // the scores by columns
  const [scoresCols, setScoresCols] = useState(emptyScoresCols());
  const [opponentScoresCols, setOpponentScoresCols] = useState(emptyScoresCols());

  // the score total
  const [scoreTotal, setScoreTotal] = useState(0);
  const [opponentScoreTotal, setOpponentScoreTotal] = useState(0);

  // reset the hand
  const resetHand = () => {
    setPlacedCards(emptyPlacedCards());
    setOpponentPlacedCards(emptyPlacedCards());
    setScoresRows(emptyScoresRows());
    setOpponentScoresRows(emptyScoresRows());
    setScoresCols(emptyScoresCols());
    setOpponentScoresCols(emptyScoresCols());
    setScoreTotal(0);
    setOpponentScoreTotal(0);
  };

  // place the given card at the stated column and row
  const placeAndScoreCard = (col, row, card) => {
    const newPlacedCards = cloneByJSON(placedCards);
    newPlacedCards[col][row] = { suit: card.suit, number: card.number };
    const { scoresRows: newScoresRows, scoresCols: newScoresCols, scoreTotal: newScoreTotal } = updateHandScores(
      col,
      row,
      scoresCols,
      scoresRows,
      newPlacedCards,
    );

    // remember the updated hand
    setPlacedCards(newPlacedCards);
    setScoresRows(newScoresRows);
    setScoresCols(newScoresCols);
    setScoreTotal(newScoreTotal);

    // TODO - need to get the opponent to play a good move here - for now just put the card in the same slot
    const newOpponentPlacedCards = cloneByJSON(opponentPlacedCards);
    newOpponentPlacedCards[col][row] = { suit: card.suit, number: card.number };
    const {
      scoresRows: newOpponentScoresRows,
      scoresCols: newOpponentScoresCols,
      scoreTotal: newOpponentScoreTotal,
    } = updateHandScores(col, row, scoresCols, scoresRows, newPlacedCards);

    // remember the updated Opponent hand
    setOpponentPlacedCards(newOpponentPlacedCards);
    setOpponentScoresRows(newOpponentScoresRows);
    setOpponentScoresCols(newOpponentScoresCols);
    setOpponentScoreTotal(newOpponentScoreTotal);
  };

  // the deck with its current card index
  // note: deck contains a shuffled deck - but opponentDeck only includes the placed cards
  const [deck, setDeck] = useState([]);
  const [opponentDeck, setOpponentDeck] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // set the deck and go back to first card, and reset the hand/scores
  const setDeckAndResetCurrentCardIndex = (newDeck) => {
    setDeck(newDeck);
    setOpponentDeck([]);
    setCurrentCardIndex(0);
    resetHand();
  };

  // reset the deck to a random shuffle
  const resetDeck = () => {
    setDeck(createShuffledDeck());
    setOpponentDeck([]);
    setCurrentCardIndex(0);
  };

  // move current card to given col,row, score it, and move current card to next card in the deck
  const placeCurrentCard = (col, row) => {
    const currentCard = deck[currentCardIndex];
    placeAndScoreCard(col, row, currentCard);

    // update the deck
    const newDeck = cloneByJSON(deck);
    newDeck[currentCardIndex].left = col2Left(col);
    newDeck[currentCardIndex].top = row2Top(row);
    setDeck(newDeck);

    // and the same for the opponent - remember the opponent deck is just the placed cards
    // TODO - for now placed in same col/row - just need to know the left is in a different place
    const newOpponentDeck = cloneByJSON(opponentDeck);
    const opponentCurrentCard = cloneByJSON(currentCard);
    newOpponentDeck[currentCardIndex] = opponentCurrentCard;
    newOpponentDeck[currentCardIndex].left = col2Left(col + 8);
    newOpponentDeck[currentCardIndex].top = row2Top(row);
    setOpponentDeck(newOpponentDeck);

    // onto the next card
    setCurrentCardIndex(currentCardIndex + 1);
  };

  // expose our state and state functions via the context
  const context = {
    // the main menu open
    mainMenuOpen,
    openMainMenu,
    closeMainMenu,

    // the host peer game open
    hostPeerGameOpen,
    openHostPeerGame,
    closeHostPeerGame,

    // the join peer game open
    joinPeerGameOpen,
    openJoinPeerGame,
    closeJoinPeerGame,

    // the placed cards and scores, both for the player and the opponent
    placedCards,
    opponentPlacedCards,
    scoresRows,
    opponentScoresRows,
    scoresCols,
    opponentScoresCols,
    scoreTotal,
    opponentScoreTotal,

    // reset the hand
    resetHand,

    // the deck with its current card index
    deck,
    opponentDeck,
    currentCardIndex,
    gameInProgress: !!deck?.length,
    setDeck: setDeckAndResetCurrentCardIndex,
    resetDeck,
    placeCurrentCard,
  };

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
