import React, { useState } from 'react';

import PropTypes from 'prop-types';

import UIStateContext from './UIStateContext';

const UIStateContextProvider = ({ children }) => {
  const [mainMenuOpen, setMainMenuOpen] = useState(true);
  const context = {
    mainMenuOpen,
    setMainMenuOpen,
  };

  return <UIStateContext.Provider value={context}>{children}</UIStateContext.Provider>;
};

UIStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UIStateContextProvider;
