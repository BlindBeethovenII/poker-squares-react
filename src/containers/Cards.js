import { connect } from 'react-redux';

// import {
//     placeCard,
// } from '../redux/actions/hand';

import Cards from '../components/Cards';


function mapStateToProps(state) {
  const { deck, currentCardIndex } = state.deal;

  return {
    deck,
    currentCardIndex,
  };
}

const mapDispatchToProps = {
  // placeCard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards);
