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
        <Score key={keyFromIndex('rowscore', row, 'human')} col={5} row={row} score={score} isTotalScore={false} />
      ))}
      {scoresCols.map((score, col) => (
        <Score key={keyFromIndex('colscore', col, 'human')} col={col} row={5} score={score} isTotalScore={false} />
      ))}
      <Score
        key="totalscore_human"
        col={5}
        row={5}
        score={scoreTotal}
        isTotalScore
        winningScore={scoreTotal > opponentScoreTotal}
      />
      {opponentScoresRows.map((score, row) => (
        <Score key={keyFromIndex('rowscore', row, 'opponent')} col={7} row={row} score={score} isTotalScore={false} />
      ))}
      {opponentScoresCols.map((score, col) => (
        <Score
          key={keyFromIndex('colscore', col, 'opponent')}
          col={col + 8}
          row={5}
          score={score}
          isTotalScore={false}
        />
      ))}
      <Score
        key="totalscore_opponent"
        col={7}
        row={5}
        score={opponentScoreTotal}
        isTotalScore
        winningScore={opponentScoreTotal > scoreTotal}
      />
    </div>
  );
};

export default Scores;
