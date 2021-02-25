import React from 'react';

import PlayArea from './components/PlayArea';
import Cards from './components/CardsConnector';
import Scores from './components/ScoresConnector';
import GitInfo from './components/GitInfo';

const App = () => (
  <div>
    <PlayArea />
    <Cards />
    <Scores />
    <GitInfo />
  </div>
);

export default App;
