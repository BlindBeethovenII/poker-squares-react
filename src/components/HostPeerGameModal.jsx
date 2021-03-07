import React, { useContext, useEffect, useState } from 'react';

import { Modal } from 'react-responsive-modal';
import styled from 'styled-components';

import GameStateContext from '../context/GameStateContext';
import ConnectionContext from '../context/ConnectionContext';

import { createShuffledDeck } from '../shared/card-functions';
import { createDeckMessage } from '../shared/peer-messages';

const Button = styled.button`
  background: #761d38;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
`;

const Title = styled.h2`
  background: white;
  color: #761d38;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
  text-align: center;
`;

const Info = styled.p`
  background: white;
  color: #761d38;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
  text-align: center;
`;

const HostPeerGameModal = () => {
  const [readyToPlay, setReadyToPlay] = useState(false);

  const { openMainMenu, hostPeerGameOpen, closeHostPeerGame, setDeck } = useContext(GameStateContext);
  const { brokerId, error, connectedTo, disconnected, closed, resetConnection, hostGame } = useContext(
    ConnectionContext,
  );

  useEffect(() => {
    if (hostPeerGameOpen) {
      // dialog is opening - perhaps for the second time - reset everything ready for a hosting a new game
      resetConnection();
      setReadyToPlay(false);
    }
  }, [hostPeerGameOpen]);

  const hostNewGame = () => {
    const deck = createShuffledDeck();
    hostGame(createDeckMessage(deck));
    setDeck(deck);
    setReadyToPlay(true);
  };

  const closeHostPeerGameDialog = () => {
    closeHostPeerGame();
    openMainMenu();
  };

  return (
    <div>
      <Modal open={hostPeerGameOpen} onClose={closeHostPeerGameDialog} center>
        <Title>Host Peer Game</Title>
        <Button onClick={hostNewGame}>Host</Button>
        {brokerId && <Info>Broker Id: {brokerId}</Info>}
        {connectedTo && <Info>Connected To: {connectedTo}</Info>}
        {disconnected && <Info>Disconnected</Info>}
        {closed && <Info>Closed</Info>}
        {error && <Info>Error: {error.type}</Info>}
        {readyToPlay && <Button onClick={closeHostPeerGame}>Play</Button>}
        <Button onClick={closeHostPeerGameDialog}>Cancel</Button>
      </Modal>
    </div>
  );
};

export default HostPeerGameModal;
