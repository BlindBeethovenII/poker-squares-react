import { connect } from 'react-redux';

import Scores from './Scores';

function mapStateToProps(state) {
  const { hand } = state;
  const { scoresRows, scoresCols, scoreTotal } = hand;

  return {
    scoresRows,
    scoresCols,
    scoreTotal,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Scores);
