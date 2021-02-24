import { connect } from 'react-redux';

import Cards from './Cards';

function mapStateToProps(state) {
  const { deal } = state;
  const { deck, currentCardIndex } = deal;

  return {
    deck,
    currentCardIndex,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
