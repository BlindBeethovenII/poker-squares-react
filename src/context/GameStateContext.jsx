import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { CARD_NONE } from '../shared/constants';
import { cloneByJSON } from '../useful-js-functions';
import { updateHandScores } from '../shared/card-functions';

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

  // the scores by row
  const [scoresRows, setScoresRows] = useState(emptyScoresRows());

  // the scores by columns
  const [scoresCols, setScoresCols] = useState(emptyScoresCols());

  // the score total
  const [scoreTotal, setScoreTotal] = useState(0);

  // reset the hand
  const resetHand = () => {
    setPlacedCards(emptyPlacedCards());
    setScoresRows(emptyScoresRows());
    setScoresCols(emptyScoresCols());
    setScoreTotal(0);
  };

  // place the given card at the stated column and row
  const placeCard = (col, row, card) => {
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

    // the placed cards and scores
    placedCards,
    scoresRows,
    scoresCols,
    scoreTotal,
    resetHand,
    placeCard,
  };

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
