import React from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';

import { col2Left, row2Top } from '../card-functions';

const left = col2Left(2) + 47;
const top = row2Top(6) + 10;

const divstyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: '40px',
  height: '40px',
};

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
  const { gameInProgress, openMainMenu } = props;

  if (gameInProgress) {
    return (
      <div style={divstyle}>
        <Button onClick={openMainMenu}>Main Menu</Button>
      </div>
    );
  }

  // don't show button as no game in progress
  return null;
};

MainMenuModal.propTypes = {
  gameInProgress: PropTypes.bool.isRequired,
  openMainMenu: PropTypes.func.isRequired,
};

export default MainMenuModal;
