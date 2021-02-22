import React, { Component } from 'react';

import PlayArea from './components/PlayArea';
import Cards from './containers/Cards';
import Scores from './containers/Scores';


class App extends Component {
  render() {
    return (
      <div>
        <PlayArea/>
        <Cards/>
        <Scores/>
      </div>
    );
  }
}

export default App;
