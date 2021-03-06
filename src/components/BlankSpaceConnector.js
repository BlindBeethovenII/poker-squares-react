import { connect } from 'react-redux';

import { dealNextCard } from '../redux/actions/deal';

import BlankSpace from './BlankSpace';

function mapStateToProps(state) {
  const { deal } = state;
  const { deck, currentCardIndex } = deal;

  return {
    deck,
    dealtCard: deck[currentCardIndex],
  };
}

const mapDispatchToProps = {
  dealNextCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlankSpace);
