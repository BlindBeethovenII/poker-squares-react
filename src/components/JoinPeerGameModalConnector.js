import { connect } from 'react-redux';

import { closeJoinPeerGame, openMainMenu } from '../redux/actions/ui';

import JoinPeerGameModal from './JoinPeerGameModal';

function mapStateToProps(state) {
  const { ui } = state;
  const { joinPeerGameOpen } = ui;

  return {
    joinPeerGameOpen,
  };
}

const mapDispatchToProps = (dispatch) => ({
  closeJoinPeerGame: () => {
    dispatch(closeJoinPeerGame());
    dispatch(openMainMenu());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinPeerGameModal);
