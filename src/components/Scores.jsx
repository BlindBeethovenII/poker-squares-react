import React, { useContext } from 'react';

import Score from './Score';
import { keyFromIndex } from '../shared/card-functions';
import GameStateContext from '../context/GameStateContext';

const Scores = () => {
  const { scoresRows, opponentScoresRows, scoresCols, opponentScoresCols, scoreTotal, opponentScoreTotal } = useContext(
    GameStateContext,
  );

  return (
    <div>
      {scoresRows.map((score, row) => (
        <Score key={keyFromIndex('rowscore', row)} col={5} row={row} score={score} isTotalScore={false} />
      ))}
      {scoresCols.map((score, col) => (
        <Score key={keyFromIndex('colscore', col)} col={col} row={5} score={score} isTotalScore={false} />
      ))}
      <Score key="totalscore" col={5} row={5} score={scoreTotal} isTotalScore />
      {opponentScoresRows.map((score, row) => (
        <Score key={keyFromIndex('rowscore', row)} col={7} row={row} score={score} isTotalScore={false} />
      ))}
      {opponentScoresCols.map((score, col) => (
        <Score key={keyFromIndex('colscore', col)} col={col + 8} row={5} score={score} isTotalScore={false} />
      ))}
      <Score key="totalscore" col={7} row={5} score={opponentScoreTotal} isTotalScore />
    </div>
  );
};

export default Scores;
