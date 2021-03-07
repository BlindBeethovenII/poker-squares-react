import React from 'react';

import PlayArea from './components/PlayArea';
import Cards from './components/Cards';
import Scores from './components/Scores';
import GitInfo from './components/GitInfo';
import MainMenuButton from './components/MainMenuButton';
import MainMenuModal from './components/MainMenuModal';
import HostPeerGameModal from './components/HostPeerGameModal';
import JoinPeerGameModal from './components/JoinPeerGameModal';

import { GameStateContextProvider } from './context/GameStateContext';
import { ConnectionContextProvider } from './context/ConnectionContext';

const App = () => (
  <GameStateContextProvider>
    <ConnectionContextProvider>
      <PlayArea />
      <Cards />
      <Scores />
      <GitInfo />
      <MainMenuButton />
      <MainMenuModal />
      <HostPeerGameModal />
      <JoinPeerGameModal />
    </ConnectionContextProvider>
  </GameStateContextProvider>
);

export default App;
