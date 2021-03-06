import React, { useState } from 'react';

import PropTypes from 'prop-types';

const GameStateContext = React.createContext({});

export const GameStateContextProvider = ({ children }) => {
  // the main menu open state bool and functions
  const [mainMenuOpen, setMainMenuOpen] = useState(true);
  const openMainMenu = () => setMainMenuOpen(true);
  const closeMainMenu = () => setMainMenuOpen(false);

  // expose our state and state functions via the context
  const context = {
    mainMenuOpen,
    openMainMenu,
    closeMainMenu,
  };

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
