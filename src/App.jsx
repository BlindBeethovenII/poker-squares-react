import React from 'react';

import PlayArea from './components/PlayArea';
import Cards from './components/CardsConnector';
import Scores from './components/ScoresConnector';
import GitInfo from './components/GitInfo';
import MainMenuButton from './components/MainMenuButtonConnector';
import MainMenuModal from './components/MainMenuModalConnector';

const App = () => (
  <div>
    <PlayArea />
    <Cards />
    <Scores />
    <GitInfo />
    <MainMenuButton />
    <MainMenuModal />
  </div>
);

export default App;
