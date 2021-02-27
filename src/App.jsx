import React from 'react';

import PlayArea from './components/PlayArea';
import Cards from './components/CardsConnector';
import Scores from './components/ScoresConnector';
import GitInfo from './components/GitInfo';
import MainMenuButton from './components/MainMenuButtonConnector';
import MainMenuModal from './components/MainMenuModalConnector';
import HostPeerGameModal from './components/HostPeerGameModalConnector';

const App = () => (
  <div>
    <PlayArea />
    <Cards />
    <Scores />
    <GitInfo />
    <MainMenuButton />
    <MainMenuModal />
    <HostPeerGameModal />
  </div>
);

export default App;
