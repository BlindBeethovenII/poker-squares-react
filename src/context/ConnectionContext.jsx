import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Peer from 'peerjs';

const ConnectionContext = React.createContext({});

export const ConnectionContextProvider = ({ children }) => {
  // the context we are managing
  const [peer, setPeer] = useState(undefined);
  const [brokerId, setBrokerId] = useState('');
  const [error, setError] = useState(undefined);
  const [connection, setConnection] = useState(undefined);
  const [disconnected, setDisconnected] = useState(false);
  const [closed, setClosed] = useState(false);

  // reset the connection
  const resetConnection = () => {
    if (peer) {
      peer.destroy();
    }
    setBrokerId('');
    setError(undefined);
    setConnection(undefined);
    setDisconnected(false);
    setClosed(false);
  };

  // host a new game, and send the given data when a connection is made
  const hostGame = (data) => {
    const localPeer = new Peer('poker-squares-react');

    // remember the peer, so it can be reset
    setPeer(localPeer);

    localPeer.on('open', () => {
      if (brokerId !== localPeer.id) {
        setBrokerId(localPeer.id);
      }
    });

    localPeer.on('error', (err) => setError(err));

    localPeer.on('connection', (conn) => {
      setConnection(conn);

      // send the given data, if defined, when the connection is opened
      conn.on('open', () => {
        if (data) {
          conn.send(data);
        }
      });
    });

    localPeer.on('disconnected', () => {
      setDisconnected(true);
    });

    localPeer.on('close', () => {
      setClosed(true);
    });
  };

  const joinGame = (processData) => {
    const localPeer = new Peer();

    // remember the peer, so it can be reset
    setPeer(localPeer);

    localPeer.on('open', () => {
      if (brokerId !== localPeer.id) {
        setBrokerId(localPeer.id);
      }

      const conn = localPeer.connect('poker-squares-react');

      conn.on('open', () => {
        setConnection(conn);
      });

      conn.on('data', processData);

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

  // send the given data packet down our connection, if one exists
  const sendData = (data) => {
    if (connection) {
      connection.send(data);
    } else {
      console.log(`ConnectionConext logical error: sendData called when connection not defined`);
    }
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
  };

  return <ConnectionContext.Provider value={context}>{children}</ConnectionContext.Provider>;
};

ConnectionContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ConnectionContext;
