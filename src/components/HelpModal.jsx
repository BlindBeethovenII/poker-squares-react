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

const HelpModal = () => {
  const { helpOpen, closeHelp } = useContext(GameStateContext);

  return (
    <Modal open={helpOpen} onClose={closeHelp} center>
      <Title>Help</Title>
    </Modal>
  );
};

export default HelpModal;
