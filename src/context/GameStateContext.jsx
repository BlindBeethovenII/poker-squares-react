import React, { useState } from 'react';

import PropTypes from 'prop-types';

const GameStateContext = React.createContext({});

export const GameStateContextProvider = ({ children }) => {
  const [mainMenuOpen, setMainMenuOpen] = useState(true);
  const context = {
    mainMenuOpen,
    setMainMenuOpen,
  };

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
