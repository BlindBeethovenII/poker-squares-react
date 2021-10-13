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
import {
  updateHandScores,
  col2Left,
  row2Top,
  createShuffledDeck,
  generateOpponentCardId,
} from '../shared/card-functions';
import {
  placeCardByAlgorithm0,
  placeCardByAlgorithm1,
  placeCardByAlgorithm2,
} from '../shared/card-placement-algorithms';
import { createPlaceCardMessage } from '../shared/peer-messages';

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
  const [opponentPlacedCards, _setOpponentPlacedCards] = useState(emptyPlacedCards());

  // the scores by row
  const [scoresRows, setScoresRows] = useState(emptyScoresRows());
  const [opponentScoresRows, _setOpponentScoresRows] = useState(emptyScoresRows());

  // the scores by columns
  const [scoresCols, setScoresCols] = useState(emptyScoresCols());
  const [opponentScoresCols, _setOpponentScoresCols] = useState(emptyScoresCols());

  // the score total
  const [scoreTotal, setScoreTotal] = useState(0);
  const [opponentScoreTotal, setOpponentScoreTotal] = useState(0);

  // see comment later for code called from event listeners
  const opponentPlacedCardsRef = React.useRef(opponentPlacedCards);
  const setOpponentPlacedCards = (data) => {
    console.log(`setOpponentPlacedCards called ${JSON.stringify(data)}`);
    opponentPlacedCardsRef.current = data;
    _setOpponentPlacedCards(data);
  };
  const opponentScoresRowsRef = React.useRef(opponentScoresRows);
  const setOpponentScoresRows = (data) => {
    opponentScoresRowsRef.current = data;
    _setOpponentScoresRows(data);
  };
  const opponentScoresColsRef = React.useRef(opponentScoresCols);
  const setOpponentScoresCols = (data) => {
    opponentScoresColsRef.current = data;
    _setOpponentScoresCols(data);
  };

  // reset the hand
  const resetHand = () => {
    console.log('GameStateContext resetHand called');
    setPlacedCards(emptyPlacedCards());
    setOpponentPlacedCards(emptyPlacedCards());
    setScoresRows(emptyScoresRows());
    setOpponentScoresRows(emptyScoresRows());
    setScoresCols(emptyScoresCols());
    setOpponentScoresCols(emptyScoresCols());
    setScoreTotal(0);
    setOpponentScoreTotal(0);
  };

  // the deck with its current card index
  // note: deck contains a shuffled deck - used for the master deal - where the join peer is sent it from the host
  const [deck, setDeck] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // place the given card at the stated column and row - this is always done at currentCardIndex
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

    // and update the deck and remember it - note the player's cards are drawn from the deck
    const newDeck = cloneByJSON(deck);
    newDeck[currentCardIndex].left = col2Left(col);
    newDeck[currentCardIndex].top = row2Top(row);
    setDeck(newDeck);
  };

  // place the given card at the stated opponent's column and row, with the given card index
  // this is called from a peer data event listener so we need to use useRef so the latest value of opponentPlacedCards is available to this function
  const placeAndScoreOpponentCard = (opponentCol, oppponentRow, card) => {
    console.log(
      `placeAndScoreOpponentCard opponentPlacedCardsRef.current=${JSON.stringify(opponentPlacedCardsRef.current)}`,
    );

    // place the opponent's card in the stated col/row - note: the opponent's cards are rendered to the screen from the opponent placed cards array of arrays
    // note: we use the Ref.current here, as this code is called from an event listener
    const newOpponentPlacedCards = cloneByJSON(opponentPlacedCardsRef.current);
    const newCard = cloneByJSON(card);
    newCard.left = col2Left(opponentCol + 8);
    newCard.top = row2Top(oppponentRow);
    // and we need a unique id for the React Card object
    newCard.id = generateOpponentCardId(card.suit, card.number);
    newOpponentPlacedCards[opponentCol][oppponentRow] = newCard;
    const {
      scoresRows: newOpponentScoresRows,
      scoresCols: newOpponentScoresCols,
      scoreTotal: newOpponentScoreTotal,
    } = updateHandScores(
      opponentCol,
      oppponentRow,
      opponentScoresColsRef.current,
      opponentScoresRowsRef.current,
      newOpponentPlacedCards,
    );

    // remember the updated Opponent hand
    console.log(
      `placeAndScoreOpponentCard about to call setOpponentPlacedCards newOpponentPlacedCards=${JSON.stringify(
        newOpponentPlacedCards,
      )}`,
    );
    setOpponentPlacedCards(newOpponentPlacedCards);
    setOpponentScoresRows(newOpponentScoresRows);
    setOpponentScoresCols(newOpponentScoresCols);
    setOpponentScoreTotal(newOpponentScoreTotal);
  };

  // set the deck and go back to first card, and reset the hand/scores
  const setDeckAndResetCurrentCardIndex = (newDeck) => {
    setDeck(newDeck);
    setCurrentCardIndex(0);
    resetHand();
  };

  // reset the deck to a random shuffle
  const resetDeck = () => {
    setDeck(createShuffledDeck());
    setCurrentCardIndex(0);
  };

  // the opponent level
  const [opponentLevel, setOpponentLevel] = useState(1);

  // move current card to given col,row, score it, and move current card to next card in the deck
  // and if we are playing an AI, then play the AI's card as well
  // we have to provide sendData as GameStateContext is within the ConnectionContext and so cannot access it itself
  const placeCurrentCard = (col, row, sendData) => {
    const currentCard = deck[currentCardIndex];

    if (opponentType === OPPONENT_TYPE_AI) {
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
      const { col: opponentCol, row: oppponentRow } = cardPlacementAlgorithm(
        currentCard,
        opponentPlacedCards,
        algorithm,
      );

      placeAndScoreOpponentCard(opponentCol, oppponentRow, currentCard);
    } else {
      // send this card to the human opponent
      sendData(createPlaceCardMessage(col, row, currentCard.suit, currentCard.number));
    }

    // now do the humn place and score
    placeAndScoreCard(col, row, currentCard);

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
    currentCardIndex,
    gameInProgress: !!deck?.length,
    setDeck: setDeckAndResetCurrentCardIndex,
    resetDeck,
    placeCurrentCard,
    placeAndScoreOpponentCard,

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
