import { connect } from 'react-redux';

import { setDeck } from '../redux/actions/deal';

import HostPeerGameModal from './HostPeerGameModal';

const mapDispatchToProps = (dispatch) => ({
  setDeck: (deck) => {
    dispatch(setDeck(deck));
  },
});

export default connect(undefined, mapDispatchToProps)(HostPeerGameModal);
