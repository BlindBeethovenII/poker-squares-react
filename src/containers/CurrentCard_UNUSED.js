import { connect } from 'react-redux';

// import {
//     placeCard,
// } from '../redux/actions/hand';

import CurrentCard from '../components/CurrentCard';


function mapStateToProps(state) {
  const { currentCard } = state.deal;

  return {
    currentCard,
  };
}

const mapDispatchToProps = {
  // placeCard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentCard);
