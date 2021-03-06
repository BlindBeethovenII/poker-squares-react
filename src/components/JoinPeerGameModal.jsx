import React, { useContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { Modal } from 'react-responsive-modal';
import styled from 'styled-components';
import Peer from 'peerjs';

import { isDeckMessage, getDeckFromMessage } from '../shared/peer-messages';
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

const JoinPeerGameModal = (props) => {
  const { joinPeerGameOpen, setDeck, playGame, closeJoinPeerGame } = props;

  const [peer, setPeer] = useState(undefined);
  const [brokerId, setBrokerId] = useState('');
  const [error, setError] = useState(undefined);
  const [connectedTo, setConnectedTo] = useState('');
  const [disconnected, setDisconnected] = useState(false);
  const [closed, setClosed] = useState(false);
  const [readyToPlay, setReadyToPlay] = useState(false);

  const { openMainMenu } = useContext(GameStateContext);

  useEffect(() => {
    if (joinPeerGameOpen) {
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
  }, [joinPeerGameOpen]);

  const join = () => {
    const localPeer = new Peer();

    // remember the peer, so we can reset when the dialog is re-entered
    setPeer(localPeer);

    localPeer.on('open', () => {
      if (brokerId !== localPeer.id) {
        setBrokerId(localPeer.id);
      }

      const conn = localPeer.connect('poker-squares-react');

      conn.on('open', () => {
        setConnectedTo(conn.peer);
      });

      conn.on('data', (data) => {
        if (isDeckMessage(data)) {
          setDeck(getDeckFromMessage(data));
          setReadyToPlay(true);
        } else {
          setError(`Unexpected message from host: ${data.type}`);
        }
      });

      conn.on('close', () => {
        setClosed(true);
      });

      conn.on('error', (err) => setError(err));
    });

    localPeer.on('error', (err) => setError(err));

    localPeer.on('connection', (conn) => {
      // Disallow incoming connections
      conn.on('open', () => {
        conn.close();
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
  const localCloseJoinPeerGame = () => {
    openMainMenu();
    closeJoinPeerGame();
  };

  return (
    <div>
      <Modal open={joinPeerGameOpen} onClose={localCloseJoinPeerGame} center>
        <Title>Join Peer Game</Title>
        <Button onClick={join}>Join</Button>
        {brokerId && <Info>Broker Id: {brokerId}</Info>}
        {connectedTo && <Info>Connected To: {connectedTo}</Info>}
        {disconnected && <Info>Disconnected</Info>}
        {closed && <Info>Closed</Info>}
        {error && <Info>Error: {error.type}</Info>}
        {readyToPlay && <Button onClick={playGame}>Play</Button>}
        <Button onClick={localCloseJoinPeerGame}>Cancel</Button>
      </Modal>
    </div>
  );
};

JoinPeerGameModal.propTypes = {
  joinPeerGameOpen: PropTypes.bool.isRequired,
  setDeck: PropTypes.func.isRequired,
  playGame: PropTypes.func.isRequired,
  closeJoinPeerGame: PropTypes.func.isRequired,
};

export default JoinPeerGameModal;
