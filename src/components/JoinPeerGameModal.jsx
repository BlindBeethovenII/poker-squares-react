import React, { useContext, useEffect, useState } from 'react';

import { Modal } from 'react-responsive-modal';
import styled from 'styled-components';

import GameStateContext from '../context/GameStateContext';
import ConnectionContext from '../context/ConnectionContext';

import { isDeckMessage, getDeckFromMessage } from '../shared/peer-messages';

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

const JoinPeerGameModal = () => {
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [unexpectedData, setUnexpectedData] = useState('');

  const { openMainMenu, joinPeerGameOpen, closeJoinPeerGame, setDeck } = useContext(GameStateContext);
  const { brokerId, error, connectedTo, disconnected, closed, resetConnection, joinGame } = useContext(
    ConnectionContext,
  );

  useEffect(() => {
    if (joinPeerGameOpen) {
      // dialog is opening - perhaps for the second time - reset everything ready for a join a new game
      resetConnection();
      setReadyToPlay(false);
      setUnexpectedData('');
    }
  }, [joinPeerGameOpen]);

  const processData = (data) => {
    if (isDeckMessage(data)) {
      setDeck(getDeckFromMessage(data));
      setReadyToPlay(true);
    } else {
      setUnexpectedData(data.type);
    }
  };

  const joinNewGame = () => {
    joinGame(processData);
  };

  const closeJoinPeerGameDialog = () => {
    closeJoinPeerGame();
    openMainMenu();
  };

  return (
    <div>
      <Modal open={joinPeerGameOpen} onClose={closeJoinPeerGameDialog} center>
        <Title>Join Peer Game</Title>
        <Button onClick={joinNewGame}>Join</Button>
        {brokerId && <Info>Broker Id: {brokerId}</Info>}
        {connectedTo && <Info>Connected To: {connectedTo}</Info>}
        {disconnected && <Info>Disconnected</Info>}
        {closed && <Info>Closed</Info>}
        {error && <Info>Error: {error.type}</Info>}
        {unexpectedData && <Info>Unexpected Data From Host: {unexpectedData}</Info>}
        {readyToPlay && <Button onClick={closeJoinPeerGame}>Play</Button>}
        <Button onClick={closeJoinPeerGameDialog}>Cancel</Button>
      </Modal>
    </div>
  );
};

export default JoinPeerGameModal;
