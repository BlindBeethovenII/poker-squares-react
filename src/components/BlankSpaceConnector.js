import { connect } from 'react-redux';

import { placeCard } from '../redux/actions/hand';
import { dealNextCard } from '../redux/actions/deal';

import BlankSpace from './BlankSpace';

function mapStateToProps(state) {
  const { deal } = state;
  const { deck, currentCardIndex } = deal;

  return {
    dealtCard: deck[currentCardIndex],
  };
}

const mapDispatchToProps = {
  placeCard,
  dealNextCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlankSpace);
