import React from 'react';

import PropTypes from 'prop-types';

import { Modal } from 'react-responsive-modal';
import styled from 'styled-components';

const Button = styled.button`
  background: palevioletred;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const MainMenuModal = (props) => {
  const { mainMenuOpen, gameInProgress, resetBoard, closeMainMenu } = props;

  const startGame = () => {
    resetBoard();
    closeMainMenu();
  };

  const closeIFGameInProgress = () => {
    // this way of closing is only possible if a game is in progress
    if (gameInProgress) {
      closeMainMenu();
    }
  };

  return (
    <div>
      <Modal open={mainMenuOpen} onClose={closeIFGameInProgress} center closeOnEsc={gameInProgress}>
        <h2>Main Menu</h2>
        <Button onClick={startGame}>Start New Game</Button>
        {gameInProgress && <Button onClick={closeIFGameInProgress}>Resume Game</Button>}
      </Modal>
    </div>
  );
};

MainMenuModal.propTypes = {
  mainMenuOpen: PropTypes.bool.isRequired,
  gameInProgress: PropTypes.bool.isRequired,
  resetBoard: PropTypes.func.isRequired,
  closeMainMenu: PropTypes.func.isRequired,
};

export default MainMenuModal;
