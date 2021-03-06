import React, { useContext, useEffect, useState } from 'react';

import { Modal } from 'react-responsive-modal';
import styled from 'styled-components';
import Peer from 'peerjs';

import { createShuffledDeck } from '../shared/card-functions';
import { createDeckMessage } from '../shared/peer-messages';
import GameStateContext from '../context/GameStateContext';

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
  const [peer, setPeer] = useState(undefined);
  const [brokerId, setBrokerId] = useState('');
  const [error, setError] = useState(undefined);
  const [connectedTo, setConnectedTo] = useState('');
  const [disconnected, setDisconnected] = useState(false);
  const [closed, setClosed] = useState(false);
  const [readyToPlay, setReadyToPlay] = useState(false);

  const { openMainMenu, hostPeerGameOpen, closeHostPeerGame, setDeck } = useContext(GameStateContext);

  useEffect(() => {
    if (hostPeerGameOpen) {
      // dialog is opening - perhaps for the second time - manage the state variables and the connection
      if (peer) {
        peer.destroy();
      }
      setBrokerId('');
      setError(undefined);
      setConnectedTo('');
      setDisconnected(false);
      setClosed(false);
      setReadyToPlay(false);
    }
  }, [hostPeerGameOpen]);

  const host = () => {
    const localPeer = new Peer('poker-squares-react');

    // remember the peer, so we can reset when the dialog is re-entered
    setPeer(localPeer);

    localPeer.on('open', () => {
      if (brokerId !== localPeer.id) {
        setBrokerId(localPeer.id);
      }
    });

    localPeer.on('error', (err) => setError(err));

    localPeer.on('connection', (conn) => {
      setConnectedTo(conn.peer);

      // send them a hand - and make it our hand - when the connection completes
      conn.on('open', () => {
        const deck = createShuffledDeck();
        conn.send(createDeckMessage(deck));
        setDeck(deck);
        setReadyToPlay(true);
      });
    });

    localPeer.on('disconnected', () => {
      setDisconnected(true);
    });

    localPeer.on('close', () => {
      setClosed(true);
    });
  };

  // TODO decide where to put this
  const localCloseHostPeerGame = () => {
    openMainMenu();
    closeHostPeerGame();
  };

  return (
    <div>
      <Modal open={hostPeerGameOpen} onClose={localCloseHostPeerGame} center>
        <Title>Host Peer Game</Title>
        <Button onClick={host}>Host</Button>
        {brokerId && <Info>Broker Id: {brokerId}</Info>}
        {connectedTo && <Info>Connected To: {connectedTo}</Info>}
        {disconnected && <Info>Disconnected</Info>}
        {closed && <Info>Closed</Info>}
        {error && <Info>Error: {error.type}</Info>}
        {readyToPlay && <Button onClick={closeHostPeerGame}>Play</Button>}
        <Button onClick={localCloseHostPeerGame}>Cancel</Button>
      </Modal>
    </div>
  );
};

export default HostPeerGameModal;
