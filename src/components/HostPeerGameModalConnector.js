import { connect } from 'react-redux';

import { closeHostPeerGame, openMainMenu } from '../redux/actions/ui';

import HostPeerGameModal from './HostPeerGameModal';

function mapStateToProps(state) {
  const { ui } = state;
  const { hostPeerGameOpen } = ui;

  return {
    hostPeerGameOpen,
  };
}

const mapDispatchToProps = (dispatch) => ({
  closeHostPeerGame: () => {
    dispatch(closeHostPeerGame());
    dispatch(openMainMenu());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HostPeerGameModal);
