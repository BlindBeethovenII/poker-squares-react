import React from 'react';

import PlayArea from './components/PlayArea';
import Cards from './components/CardsConnector';
import Scores from './components/ScoresConnector';
import GitInfo from './components/GitInfo';
import MainMenuModal from './components/MainMenuModalConnector';

const App = () => (
  <div>
    <PlayArea />
    <Cards />
    <Scores />
    <GitInfo />
    <MainMenuModal />
  </div>
);

export default App;
