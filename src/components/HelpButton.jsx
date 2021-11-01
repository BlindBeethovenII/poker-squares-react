import React, { useContext } from 'react';

import styled from 'styled-components';

import { col2Left, row2Top } from '../shared/card-functions';
import GameStateContext from '../context/GameStateContext';

const left = col2Left(11) + 47;
const top = row2Top(6) + 28;

const divstyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: '40px',
  height: '40px',
};

const Button = styled.button`
  background: #761d38;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
`;

const HelpButton = () => {
  const { openHelp } = useContext(GameStateContext);

  return (
    <div style={divstyle}>
      <Button onClick={openHelp}>Help</Button>
    </div>
  );
};

export default HelpButton;
