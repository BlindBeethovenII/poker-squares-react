import React, { useContext, useEffect, useState } from 'react';

import { Modal } from 'react-responsive-modal';
import styled from 'styled-components';

import GameStateContext from '../context/GameStateContext';
import ConnectionContext from '../context/ConnectionContext';

import {
  isNewGameMessage,
  isPlaceCardMessage,
  getNameFromMessage,
  getDeckFromMessage,
  getColFromMessage,
  getRowFromMessage,
  createOpponentNameMessage,
  getSuitFromMessage,
  getNumberFromMessage,
} from '../shared/peer-messages';
import { OPPONENT_TYPE_HUMAN } from '../shared/constants';

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

const JoinPeerGameModal = () => {
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [unexpectedData, setUnexpectedData] = useState('');
  const [name, setName] = useState('');
  const [gameId, setGameId] = useState('');

  const {
    openMainMenu,
    joinPeerGameOpen,
    closeJoinPeerGame,
    setDeck,
    setOpponentName,
    setYourName,
    setOpponentType,
    placeAndScoreOpponentCard,
    opponentPlacedCards,
  } = useContext(GameStateContext);

  const {
    brokerId,
    error,
    connectedTo,
    disconnected,
    closed,
    resetConnection,
    joinGame,
    sendData,
    clearError,
  } = useContext(ConnectionContext);

  useEffect(() => {
    if (joinPeerGameOpen) {
      // dialog is opening - perhaps for the second time - reset everything ready for a join a new game
      resetConnection();
      setReadyToPlay(false);
      setUnexpectedData('');
    }
  }, [joinPeerGameOpen]);

  // the join game peer process data function to process data it gets from the host
  // TODO - can't get setConnection() in ConnectionContextProvider to set state before this processData is called - so for now passing conn as well
  const processData = (data, conn) => {
    if (isNewGameMessage(data)) {
      console.log('JoinPeerGameModal processData received new game message');
      setOpponentType(OPPONENT_TYPE_HUMAN);
      setOpponentName(getNameFromMessage(data));
      setYourName(name);
      sendData(createOpponentNameMessage(name), conn);
      setDeck(getDeckFromMessage(data));
      setReadyToPlay(true);
    } else if (isPlaceCardMessage(data)) {
      console.log('JoinPeerGameModal processData received place card message');
      console.log(`About to call placeAndScoreOpponentCard opponentPlacedCards=${JSON.stringify(opponentPlacedCards)}`);

      const suit = getSuitFromMessage(data);
      const number = getNumberFromMessage(data);
      placeAndScoreOpponentCard(getColFromMessage(data), getRowFromMessage(data), {
        suit,
        number,
      });
    } else {
      setUnexpectedData(data.type);
    }
  };

  const joinNewGame = () => {
    clearError();
    joinGame(gameId, processData);
  };

  const closeJoinPeerGameDialog = () => {
    closeJoinPeerGame();
    openMainMenu();
  };

  return (
    <div>
      <Modal open={joinPeerGameOpen} onClose={closeJoinPeerGameDialog} center>
        <Title>Join Peer Game</Title>
        <TextInput placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
        <TextInput placeholder="Game Id" onChange={(e) => setGameId(e.target.value)} />
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
