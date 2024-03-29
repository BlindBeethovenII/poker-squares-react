import React from 'react';

import PlayArea from './components/PlayArea';
import Cards from './components/Cards';
import Scores from './components/Scores';
import GitInfo from './components/GitInfo';
import OpponentGraphics from './components/OpponentGraphics';
import MainMenuButton from './components/MainMenuButton';
import ReplayGameButton from './components/ReplayGameButton';
import HelpButton from './components/HelpButton';
import MainMenuModal from './components/MainMenuModal';
import SelectOpponentLevelModal from './components/SelectOpponentLevelModal';
import HostPeerGameModal from './components/HostPeerGameModal';
import JoinPeerGameModal from './components/JoinPeerGameModal';
import HelpModal from './components/HelpModal';

import { GameStateContextProvider } from './context/GameStateContext';
import { ConnectionContextProvider } from './context/ConnectionContext';

const App = () => (
  <GameStateContextProvider>
    <ConnectionContextProvider>
      <PlayArea />
      <Cards />
      <Scores />
      <GitInfo />
      <OpponentGraphics />
      <MainMenuButton />
      <ReplayGameButton />
      <HelpButton />
      <MainMenuModal />
      <SelectOpponentLevelModal />
      <HostPeerGameModal />
      <JoinPeerGameModal />
      <HelpModal />
    </ConnectionContextProvider>
  </GameStateContextProvider>
);

export default App;
