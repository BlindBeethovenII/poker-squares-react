import React from 'react';

import PlayArea from './components/PlayArea';
import Cards from './containers/Cards';
import Scores from './containers/Scores';

const App = () => (
  <div>
    <PlayArea />
    <Cards />
    <Scores />
  </div>
);

export default App;
