import React from 'react';

import PlayArea from './components/PlayArea';
import Cards from './components/CardsConnector';
import Scores from './components/Scores';
import GitInfo from './components/GitInfo';
import MainMenuButton from './components/MainMenuButtonConnector';
import MainMenuModal from './components/MainMenuModalConnector';
import HostPeerGameModal from './components/HostPeerGameModalConnector';
import JoinPeerGameModal from './components/JoinPeerGameModalConnector';

import { GameStateContextProvider } from './context/GameStateContext';

const App = () => (
  <GameStateContextProvider>
    <PlayArea />
    <Cards />
    <Scores />
    <GitInfo />
    <MainMenuButton />
    <MainMenuModal />
    <HostPeerGameModal />
    <JoinPeerGameModal />
  </GameStateContextProvider>
);

export default App;
