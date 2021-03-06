import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import { Modal } from 'react-responsive-modal';
import styled from 'styled-components';

import GameStateContext from '../context/GameStateContext';

const Title = styled.h2`
  background: white;
  color: #761d38;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
  text-align: center;
`;

const Button = styled.button`
  background: #761d38;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
`;

const MainMenuModal = (props) => {
  const { gameInProgress, startGame } = props;

  const { mainMenuOpen, closeMainMenu, openHostPeerGame, openJoinPeerGame, resetHand } = useContext(GameStateContext);

  const closeIfGameInProgress = () => {
    // this way of closing is only possible if a game is in progress
    if (gameInProgress) {
      closeMainMenu();
    }
  };

  // TODO decide where to put this when all are context
  const localStartGame = () => {
    closeMainMenu();
    resetHand();
    startGame();
  };

  const localHostPeerGame = () => {
    closeMainMenu();
    openHostPeerGame();
  };

  const localJoinPeerGame = () => {
    closeMainMenu();
    openJoinPeerGame();
  };

  return (
    <div>
      <Modal
        open={mainMenuOpen}
        onClose={closeIfGameInProgress}
        center
        closeOnEsc={gameInProgress}
        showCloseIcon={gameInProgress}>
        <Title>Main Menu</Title>
        <Button onClick={localStartGame}>Start New Solo Game</Button>
        <Button onClick={localHostPeerGame}>Host Peer Game</Button>
        <Button onClick={localJoinPeerGame}>Join Peer Game</Button>
        {gameInProgress && <Button onClick={closeIfGameInProgress}>Resume Game</Button>}
      </Modal>
    </div>
  );
};

MainMenuModal.propTypes = {
  gameInProgress: PropTypes.bool.isRequired,
  startGame: PropTypes.func.isRequired,
};

export default MainMenuModal;
