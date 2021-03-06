import { connect } from 'react-redux';

import { setDeck } from '../redux/actions/deal';

import JoinPeerGameModal from './JoinPeerGameModal';

const mapDispatchToProps = (dispatch) => ({
  setDeck: (deck) => {
    dispatch(setDeck(deck));
  },
});

export default connect(undefined, mapDispatchToProps)(JoinPeerGameModal);
