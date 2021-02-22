import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import Score from './Score';



class Scores extends PureComponent {
  render() {
    // redux provides the hand values we are interested in
    const { scoresRows, scoresCols, scoreTotal } = this.props;

    return (
      <div>
        { scoresRows.map((score, row) => <Score key={`rowscore_${row}`} col={5} row={row} score={score} />) }
        { scoresCols.map((score, col) => <Score key={`colscore_${col}`} col={col} row={5} score={score} />) }
        <Score key={'totalscore'} col={5} row={5} score={scoreTotal} />
      </div>
    );
  }
}

Scores.propTypes = {
  scoresRows: PropTypes.array.isRequired,
  scoresCols: PropTypes.array.isRequired,
  scoreTotal: PropTypes.number.isRequired,
};

export default Scores;
