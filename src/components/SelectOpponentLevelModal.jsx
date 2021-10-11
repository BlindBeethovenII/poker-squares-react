import React, { useContext } from 'react';

import { Modal } from 'react-responsive-modal';
import styled from 'styled-components';

import GameStateContext from '../context/GameStateContext';

import { OPPONENT_TYPE_AI } from '../shared/constants';

import AvatarLevel1 from '../images/avatars/1veryeasy.png';
import AvatarLevel2 from '../images/avatars/2easy.png';
import AvatarLevel3 from '../images/avatars/3medium.png';
import AvatarLevel4 from '../images/avatars/4hard.png';
import AvatarLevel5 from '../images/avatars/5veryhard.png';

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
  border: none;
  width: 64px;
  height: 64px;
  margin: 6px;
`;

const AvatarLevel1Button = styled(Button)`
  background-image: url(${AvatarLevel1});
`;

const AvatarLevel2Button = styled(Button)`
  background-image: url(${AvatarLevel2});
`;

const AvatarLevel3Button = styled(Button)`
  background-image: url(${AvatarLevel3});
`;

const AvatarLevel4Button = styled(Button)`
  background-image: url(${AvatarLevel4});
`;

const AvatarLevel5Button = styled(Button)`
  background-image: url(${AvatarLevel5});
`;

const SelectOpponentLevelModal = () => {
  const {
    selectOpponentLevelOpen,
    closeSelectOpponentLevel,
    openMainMenu,
    resetHand,
    resetDeck,
    setOpponentLevel,
    setOpponentType,
  } = useContext(GameStateContext);

  const closeBackToMainMenu = () => {
    closeSelectOpponentLevel();
    openMainMenu();
  };

  const localStartGame = (level) => {
    closeSelectOpponentLevel();
    setOpponentType(OPPONENT_TYPE_AI);
    setOpponentLevel(level);
    resetHand();
    resetDeck();
  };

  return (
    <div>
      <Modal open={selectOpponentLevelOpen} onClose={closeBackToMainMenu} center>
        <Title>Select Opponent Level</Title>
        <AvatarLevel1Button onClick={() => localStartGame(1)} />
        <AvatarLevel2Button onClick={() => localStartGame(2)} />
        <AvatarLevel3Button onClick={() => localStartGame(3)} />
        <AvatarLevel4Button onClick={() => localStartGame(4)} />
        <AvatarLevel5Button onClick={() => localStartGame(5)} />
      </Modal>
    </div>
  );
};

export default SelectOpponentLevelModal;
