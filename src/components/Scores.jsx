import React from 'react';

import PropTypes from 'prop-types';

import Score from './Score';
import { keyFromIndex } from '../card-functions';

const Scores = (props) => {
  // redux provides the hand values we are interested in
  const { scoresRows, scoresCols, scoreTotal } = props;

  return (
    <div>
      {scoresRows.map((score, row) => (
        <Score key={keyFromIndex('rowscore', row)} col={5} row={row} score={score} isTotalScore={false} />
      ))}
      {scoresCols.map((score, col) => (
        <Score key={keyFromIndex('colscore', col)} col={col} row={5} score={score} isTotalScore={false} />
      ))}
      <Score key="totalscore" col={5} row={5} score={scoreTotal} isTotalScore />
    </div>
  );
};

Scores.propTypes = {
  scoresRows: PropTypes.array.isRequired,
  scoresCols: PropTypes.array.isRequired,
  scoreTotal: PropTypes.number.isRequired,
};

export default Scores;
