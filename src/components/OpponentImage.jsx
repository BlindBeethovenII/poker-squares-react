import React, { useContext } from 'react';

import GameStateContext from '../context/GameStateContext';

import { col2Left, row2Top } from '../shared/card-functions';

import AvatarLevel1 from '../images/avatars/1veryeasy.png';
import AvatarLevel2 from '../images/avatars/2easy.png';
import AvatarLevel3 from '../images/avatars/3medium.png';
import AvatarLevel4 from '../images/avatars/4hard.png';
import AvatarLevel5 from '../images/avatars/5veryhard.png';

const left = col2Left(10);
const top = row2Top(6) + 10;

const imagestyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: '64px',
  height: '64px',
};

const OpponentImage = () => {
  const { opponentLevel } = useContext(GameStateContext);

  let OpponentAvatar = AvatarLevel1;
  if (opponentLevel === 2) OpponentAvatar = AvatarLevel2;
  if (opponentLevel === 3) OpponentAvatar = AvatarLevel3;
  if (opponentLevel === 4) OpponentAvatar = AvatarLevel4;
  if (opponentLevel === 5) OpponentAvatar = AvatarLevel5;

  return <img src={OpponentAvatar} alt="opponentimage" style={imagestyle} />;
};

export default OpponentImage;
