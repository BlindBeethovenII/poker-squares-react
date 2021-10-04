import React, { useContext } from 'react';

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

const SelectOpponentLevelModal = () => {
  const { selectOpponentLevelOpen, closeSelectOpponentLevel, openMainMenu, resetHand, resetDeck } = useContext(
    GameStateContext,
  );

  const closeBackToMainMenu = () => {
    closeSelectOpponentLevel();
    openMainMenu();
  };

  // TODO decide where to put this when all are context
  const localStartGame = () => {
    closeSelectOpponentLevel();
    resetHand();
    resetDeck();
  };

  return (
    <div>
      <Modal open={selectOpponentLevelOpen} onClose={closeBackToMainMenu} center>
        <Title>Select Opponent Level</Title>
        <Button onClick={localStartGame}>TODO</Button>
      </Modal>
    </div>
  );
};

export default SelectOpponentLevelModal;
