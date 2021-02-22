import { connect } from 'react-redux';

// import {
//     placeCard,
// } from '../redux/actions/hand';

import Scores from '../components/Scores';


function mapStateToProps(state) {
  const { scoresRows, scoresCols, scoreTotal } = state.hand;

  return {
    scoresRows, 
    scoresCols, 
    scoreTotal,
  };
}

const mapDispatchToProps = {
  // placeCard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scores);
