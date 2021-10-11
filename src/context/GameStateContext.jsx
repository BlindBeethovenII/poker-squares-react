import React, { useState } from 'react';

import PropTypes from 'prop-types';

import {
  CARD_NONE,
  ALGORITHM_FULL_HOUSES_THEN_PAIRS,
  ALGORITHM_FULL_HOUSES_THEN_FLUSHES,
  ALGORITHM_FLUSHES_THEN_VERTICAL_NUMBERS,
  ALGORITHM_LAST_ROW_VERTICAL_THEN_FLUSHES_THEN_VERTICAL_NUMBERS,
  ALGORITHM_STRAIGHTS_THEN_PAIRS,
  OPPONENT_TYPE_AI,
} from '../shared/constants';
import { cloneByJSON } from '../useful-js-functions';
import { updateHandScores, col2Left, row2Top, createShuffledDeck } from '../shared/card-functions';
import {
  placeCardByAlgorithm0,
  placeCardByAlgorithm1,
  placeCardByAlgorithm2,
} from '../shared/card-placement-algorithms';

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

  // the select opponent level menu open state bool and functions
  const [selectOpponentLevelOpen, setSelectOpponentLevelOpen] = useState(false);
  const openSelectOpponentLevel = () => setSelectOpponentLevelOpen(true);
  const closeSelectOpponentLevel = () => setSelectOpponentLevelOpen(false);

  // the host peer game open state bool and functions
  const [hostPeerGameOpen, setHostPeerGameOpen] = useState(false);
  const openHostPeerGame = () => setHostPeerGameOpen(true);
  const closeHostPeerGame = () => setHostPeerGameOpen(false);

  // the join peer game open state bool and functions
  const [joinPeerGameOpen, setJoinPeerGameOpen] = useState(false);
  const openJoinPeerGame = () => setJoinPeerGameOpen(true);
  const closeJoinPeerGame = () => setJoinPeerGameOpen(false);

  // the opponent type - human or AI
  const [opponentType, setOpponentType] = useState(OPPONENT_TYPE_AI);

  // the your name and opponent name for a peer game
  const [yourName, setYourName] = useState(false);
  const [opponentName, setOpponentName] = useState(false);

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
  const placeAndScoreCard = (col, row, opponentCol, oppponentRow, card) => {
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

    // place the opponent's card in the stated col/row
    const newOpponentPlacedCards = cloneByJSON(opponentPlacedCards);
    newOpponentPlacedCards[opponentCol][oppponentRow] = { suit: card.suit, number: card.number };
    const {
      scoresRows: newOpponentScoresRows,
      scoresCols: newOpponentScoresCols,
      scoreTotal: newOpponentScoreTotal,
    } = updateHandScores(opponentCol, oppponentRow, opponentScoresCols, opponentScoresRows, newOpponentPlacedCards);

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

  // the opponent level
  const [opponentLevel, setOpponentLevel] = useState(1);

  // move current card to given col,row, score it, and move current card to next card in the deck
  // and play the opponent's card as well
  const placeCurrentCard = (col, row) => {
    const currentCard = deck[currentCardIndex];

    // decide where the oppponent card is going
    // the algorithm to use is based on the opponents level
    let cardPlacementAlgorithm;
    let algorithm;
    switch (opponentLevel) {
      case 1:
      default:
        cardPlacementAlgorithm = placeCardByAlgorithm1;
        algorithm = ALGORITHM_FULL_HOUSES_THEN_PAIRS;
        break;

      case 2:
        cardPlacementAlgorithm = placeCardByAlgorithm1;
        algorithm = ALGORITHM_FULL_HOUSES_THEN_FLUSHES;
        break;

      case 3:
        cardPlacementAlgorithm = placeCardByAlgorithm0;
        algorithm = ALGORITHM_FLUSHES_THEN_VERTICAL_NUMBERS;
        break;

      case 4:
        cardPlacementAlgorithm = placeCardByAlgorithm0;
        algorithm = ALGORITHM_LAST_ROW_VERTICAL_THEN_FLUSHES_THEN_VERTICAL_NUMBERS;
        break;

      case 5:
        cardPlacementAlgorithm = placeCardByAlgorithm2;
        algorithm = ALGORITHM_STRAIGHTS_THEN_PAIRS;
        break;
    }
    const { col: opponentCol, row: oppponentRow } = cardPlacementAlgorithm(currentCard, opponentPlacedCards, algorithm);

    placeAndScoreCard(col, row, opponentCol, oppponentRow, currentCard);

    // update the deck
    const newDeck = cloneByJSON(deck);
    newDeck[currentCardIndex].left = col2Left(col);
    newDeck[currentCardIndex].top = row2Top(row);
    setDeck(newDeck);

    // and the same for the opponent, rememerbing to clone/set the card for this placement, and that these cards are laid out 8 columns to the right
    const newOpponentDeck = cloneByJSON(opponentDeck);
    const opponentCurrentCard = cloneByJSON(currentCard);
    newOpponentDeck[currentCardIndex] = opponentCurrentCard;
    newOpponentDeck[currentCardIndex].left = col2Left(opponentCol + 8);
    newOpponentDeck[currentCardIndex].top = row2Top(oppponentRow);
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

    // the select opponent level menu open
    selectOpponentLevelOpen,
    openSelectOpponentLevel,
    closeSelectOpponentLevel,

    // the host peer game open
    hostPeerGameOpen,
    openHostPeerGame,
    closeHostPeerGame,

    // the join peer game open
    joinPeerGameOpen,
    openJoinPeerGame,
    closeJoinPeerGame,

    // the opponent type - human or AI
    opponentType,
    setOpponentType,

    // the names in a peer game
    yourName,
    setYourName,
    opponentName,
    setOpponentName,

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

    // the opponent level
    opponentLevel,
    setOpponentLevel,
  };

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
