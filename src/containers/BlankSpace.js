import { connect } from 'react-redux';

import {
    placeCard,
} from '../redux/actions/hand';

import {
  dealNextCard,
} from '../redux/actions/deal';

import BlankSpace from '../components/BlankSpace';

function mapStateToProps(state) {
  const { deck, currentCardIndex } = state.deal;

  return {
    dealtCard: deck[currentCardIndex],
  };
}

const mapDispatchToProps = {
  placeCard,
  dealNextCard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlankSpace);
