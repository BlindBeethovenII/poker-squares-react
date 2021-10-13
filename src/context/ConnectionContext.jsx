import React, { useState, useContext } from 'react';

import PropTypes from 'prop-types';

import Peer from 'peerjs';

import {
  createNewGameMessage,
  isNewGameMessage,
  isPlaceCardMessage,
  isOpponentNameMessage,
  getNameFromMessage,
  getDeckFromMessage,
  getColFromMessage,
  getRowFromMessage,
  createOpponentNameMessage,
  getSuitFromMessage,
  getNumberFromMessage,
} from '../shared/peer-messages';
import { createShuffledDeck } from '../shared/card-functions';
import { OPPONENT_TYPE_HUMAN } from '../shared/constants';

import GameStateContext from './GameStateContext';

const ConnectionContext = React.createContext({});

export const ConnectionContextProvider = ({ children }) => {
  // the context we are managing
  const [peer, setPeer] = useState(undefined);
  const [brokerId, setBrokerId] = useState('');
  const [error, setError] = useState(undefined);
  const [connection, setConnection] = useState(undefined);
  const [disconnected, setDisconnected] = useState(false);
  const [closed, setClosed] = useState(false);

  const { setDeck, setOpponentName, setYourName, setOpponentType, placeAndScoreOpponentCard } = useContext(
    GameStateContext,
  );

  // reset the connection
  const resetConnection = () => {
    console.log(`resetConnection called`);
    if (peer) {
      peer.destroy();
    }
    setBrokerId('');
    setError(undefined);
    setConnection(undefined);
    setDisconnected(false);
    setClosed(false);
  };

  // send the given data packet down our connection, if one exists
  // can't always use connection, due to code being called from event listeners - could fix - but this hack is okay for now
  const sendData = (data, conn) => {
    if (connection) {
      console.log(`ConnectionConext sendData with connection defined for ${data.type}`);
      connection.send(data);
    } else if (conn) {
      console.log(`ConnectionConext sendData with connection NOT defined for ${data.type}`);
      conn.send(data);
    } else {
      console.log(`ConnectionConext logical error: sendData called when connection and conn not defined`);
    }
  };

  // host a new game, and send the given data when a connection is made
  const hostGame = (id, name, setUnexpectedData) => {
    const localPeer = new Peer(`poker-squares-react-${id}`);

    // remember the peer, so it can be reset
    setPeer(localPeer);

    // this is how we process data we get from the join peer
    const processData = (data) => {
      console.log(`hostGame processData received ${data.type} message`);

      if (isOpponentNameMessage(data)) {
        setOpponentName(getNameFromMessage(data));
      } else if (isPlaceCardMessage(data)) {
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

    localPeer.on('open', () => {
      if (brokerId !== localPeer.id) {
        setBrokerId(localPeer.id);
      }
    });

    localPeer.on('error', (err) => setError(err));

    localPeer.on('connection', (conn) => {
      setConnection(conn);

      // when the connection is opened - start the new game
      conn.on('open', () => {
        const deck = createShuffledDeck();
        const newGameMessage = createNewGameMessage(name, deck);
        setOpponentType(OPPONENT_TYPE_HUMAN);
        setYourName(name);
        setDeck(deck);
        // and send it to the join peer
        conn.send(newGameMessage);
      });

      conn.on('data', processData);
    });

    localPeer.on('disconnected', () => {
      setDisconnected(true);
    });

    localPeer.on('close', () => {
      setClosed(true);
    });
  };

  const joinGame = (id, name, setReadyToPlay, setUnexpectedData) => {
    const localPeer = new Peer();

    // remember the peer, so it can be reset
    setPeer(localPeer);

    // this is how we process data we get from the host peer
    // TODO - can't get setConnection() in ConnectionContextProvider to set state before this processData is called - so for now passing conn as well
    const processData = (data, conn) => {
      console.log(`hostGame processData received ${data.type} message`);

      if (isNewGameMessage(data)) {
        setOpponentType(OPPONENT_TYPE_HUMAN);
        setOpponentName(getNameFromMessage(data));
        setYourName(name);
        sendData(createOpponentNameMessage(name), conn);
        setDeck(getDeckFromMessage(data));
        setReadyToPlay(true);
      } else if (isPlaceCardMessage(data)) {
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

    localPeer.on('open', () => {
      if (brokerId !== localPeer.id) {
        setBrokerId(localPeer.id);
      }

      const conn = localPeer.connect(`poker-squares-react-${id}`);

      conn.on('open', () => {
        console.log(`joinGame conn.on() open fired with conn=${conn} and connection=${connection}`);
        setConnection(conn);
      });

      conn.on('data', (data) => {
        console.log(`joinGame conn.on() data fired with conn=${conn} and connection=${connection}`);
        processData(data, conn);
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

  // some clients want to clear the error before they try again
  const clearError = () => {
    setError(undefined);
  };

  // expose our state and state functions via the context
  const context = {
    // our state
    brokerId,
    error,
    connectedTo: connection?.peer,
    disconnected,
    closed,

    // our state manipulation functions
    resetConnection,
    hostGame,
    joinGame,
    sendData,
    clearError,
  };

  return <ConnectionContext.Provider value={context}>{children}</ConnectionContext.Provider>;
};

ConnectionContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ConnectionContext;
