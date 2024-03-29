import React, { useContext, useEffect, useState } from 'react';

import { Modal } from 'react-responsive-modal';
import styled from 'styled-components';

import GameStateContext from '../context/GameStateContext';
import ConnectionContext from '../context/ConnectionContext';

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

const TextInput = styled.input`
  type: text;
  color: #761d38;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
  background: papayawhip;
  font-size: 1em;
  font-weight: bold;
`;

const GameId = styled.p`
  background: #761d38;
  color: white;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
  text-align: center;
`;

const HostPeerGameModal = () => {
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [name, setName] = useState('');
  const [unexpectedData, setUnexpectedData] = useState('');
  const [gameId, setGameId] = useState('');

  const { openMainMenu, hostPeerGameOpen, closeHostPeerGame } = useContext(GameStateContext);

  const { brokerId, error, connectedTo, disconnected, closed, resetConnection, hostGame } =
    useContext(ConnectionContext);

  useEffect(() => {
    if (hostPeerGameOpen) {
      // dialog is opening - perhaps for the second time - reset everything ready for a hosting a new game
      resetConnection();
      setReadyToPlay(false);
      setUnexpectedData('');
    }
  }, [hostPeerGameOpen]);

  const hostNewGame = () => {
    // an algorithm I found on the web to generate a 4 digit hex string
    // eslint-disable-next-line no-bitwise
    const id = ((Math.random() * 0xffff) << 0).toString(16);
    setGameId(id);
    hostGame(id, name, setUnexpectedData);
    setReadyToPlay(true);
  };

  const closeHostPeerGameDialog = () => {
    closeHostPeerGame();
    openMainMenu();
  };

  return (
    <Modal open={hostPeerGameOpen} onClose={closeHostPeerGameDialog} center>
      <Title>Host Peer Game</Title>
      <TextInput placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
      <Button onClick={hostNewGame}>Host</Button>
      {gameId && <GameId>Game Id: {gameId}</GameId>}
      {brokerId && <Info>Broker Id: {brokerId}</Info>}
      {connectedTo && <Info>Connected To: {connectedTo}</Info>}
      {disconnected && <Info>Disconnected</Info>}
      {closed && <Info>Closed</Info>}
      {error && <Info>Error: {error.type}</Info>}
      {unexpectedData && <Info>Unexpected Data From Host: {unexpectedData}</Info>}
      {readyToPlay && <Button onClick={closeHostPeerGame}>Play</Button>}
      <Button onClick={closeHostPeerGameDialog}>Cancel</Button>
    </Modal>
  );
};

export default HostPeerGameModal;
