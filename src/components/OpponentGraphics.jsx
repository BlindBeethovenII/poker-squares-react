import React, { useContext } from 'react';

import styled from 'styled-components';

import GameStateContext from '../context/GameStateContext';

import { col2Left, row2Top } from '../shared/card-functions';
import { OPPONENT_TYPE_HUMAN } from '../shared/constants';

import AvatarLevel1 from '../images/avatars/1veryeasy.png';
import AvatarLevel2 from '../images/avatars/2easy.png';
import AvatarLevel3 from '../images/avatars/3medium.png';
import AvatarLevel4 from '../images/avatars/4hard.png';
import AvatarLevel5 from '../images/avatars/5veryhard.png';

const Info = styled.p`
  background: white;
  color: #761d38;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
  text-align: center;
`;

const imagestyle = {
  position: 'absolute',
  left: `${col2Left(10)}px`,
  top: `${row2Top(6) + 10}px`,
  width: '64px',
  height: '64px',
};

const yournamestyle = {
  position: 'absolute',
  left: `${col2Left(2)}px`,
  top: `${row2Top(6) + 10}px`,
};

const opponentnamestyle = {
  position: 'absolute',
  left: `${col2Left(10)}px`,
  top: `${row2Top(6) + 10}px`,
};

const OpponentImage = () => {
  const { opponentType, yourName, opponentName, opponentLevel, gameInProgress } = useContext(GameStateContext);

  // don't show anything if a game is not yet in progress
  if (!gameInProgress) {
    return null;
  }

  if (opponentType === OPPONENT_TYPE_HUMAN) {
    return (
      <>
        {yourName && <Info style={yournamestyle}>{yourName}</Info>}
        {opponentName && <Info style={opponentnamestyle}>{opponentName}</Info>}
      </>
    );
  }

  // must be an AI
  let OpponentAvatar = AvatarLevel1;
  if (opponentLevel === 2) OpponentAvatar = AvatarLevel2;
  if (opponentLevel === 3) OpponentAvatar = AvatarLevel3;
  if (opponentLevel === 4) OpponentAvatar = AvatarLevel4;
  if (opponentLevel === 5) OpponentAvatar = AvatarLevel5;

  return <img src={OpponentAvatar} alt="opponentimage" style={imagestyle} />;
};

export default OpponentImage;
