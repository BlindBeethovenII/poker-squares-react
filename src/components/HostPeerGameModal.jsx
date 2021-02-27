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

const Title = styled.h2`
  background: white;
  color: palevioletred;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  text-align: center;
`;

const HostPeerGameModal = (props) => {
  const { hostPeerGameOpen, closeHostPeerGame } = props;

  return (
    <div>
      <Modal open={hostPeerGameOpen} onClose={closeHostPeerGame} center>
        <Title>Host Peer Game</Title>
        <Button>Host</Button>
        <Button>Play</Button>
        <Button onClick={closeHostPeerGame}>Cancel</Button>
      </Modal>
    </div>
  );
};

HostPeerGameModal.propTypes = {
  hostPeerGameOpen: PropTypes.bool.isRequired,
  closeHostPeerGame: PropTypes.func.isRequired,
};

export default HostPeerGameModal;
