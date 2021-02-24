import React from 'react';

import PlayArea from './components/PlayArea';
import Cards from './components/CardsConnector';
import Scores from './components/ScoresConnector';

const App = () => (
  <div>
    <PlayArea />
    <Cards />
    <Scores />
  </div>
);

export default App;
