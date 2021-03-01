import { connect } from 'react-redux';

import { closeHostPeerGame } from '../redux/actions/ui';
import { setDeck } from '../redux/actions/deal';

import HostPeerGameModal from './HostPeerGameModal';

function mapStateToProps(state) {
  const { ui } = state;
  const { hostPeerGameOpen } = ui;

  return {
    hostPeerGameOpen,
  };
}

const mapDispatchToProps = (dispatch) => ({
  setDeck: (deck) => {
    dispatch(setDeck(deck));
  },

  playGame: () => {
    dispatch(closeHostPeerGame());
  },

  closeHostPeerGame: () => {
    dispatch(closeHostPeerGame());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HostPeerGameModal);
