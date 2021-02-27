import React from 'react';

import PropTypes from 'prop-types';

import { Modal } from 'react-responsive-modal';
import styled from 'styled-components';

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
  const { mainMenuOpen, gameInProgress, startGame, closeMainMenu, hostPeerGame, joinPeerGame } = props;

  const closeIfGameInProgress = () => {
    // this way of closing is only possible if a game is in progress
    if (gameInProgress) {
      closeMainMenu();
    }
  };

  return (
    <div>
      <Modal open={mainMenuOpen} onClose={closeIfGameInProgress} center closeOnEsc={gameInProgress}>
        <Title>Main Menu</Title>
        <Button onClick={startGame}>Start New Solo Game</Button>
        <Button onClick={hostPeerGame}>Host Peer Game</Button>
        <Button onClick={joinPeerGame}>Join Peer Game</Button>
        {gameInProgress && <Button onClick={closeIfGameInProgress}>Resume Game</Button>}
      </Modal>
    </div>
  );
};

MainMenuModal.propTypes = {
  mainMenuOpen: PropTypes.bool.isRequired,
  gameInProgress: PropTypes.bool.isRequired,
  startGame: PropTypes.func.isRequired,
  closeMainMenu: PropTypes.func.isRequired,
  hostPeerGame: PropTypes.func.isRequired,
  joinPeerGame: PropTypes.func.isRequired,
};

export default MainMenuModal;
