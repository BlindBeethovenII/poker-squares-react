import { connect } from 'react-redux';

import { closeJoinPeerGame, openMainMenu } from '../redux/actions/ui';
import { setDeck } from '../redux/actions/deal';

import JoinPeerGameModal from './JoinPeerGameModal';

function mapStateToProps(state) {
  const { ui } = state;
  const { joinPeerGameOpen } = ui;

  return {
    joinPeerGameOpen,
  };
}

const mapDispatchToProps = (dispatch) => ({
  setDeck: (deck) => {
    dispatch(setDeck(deck));
  },

  playGame: () => {
    dispatch(closeJoinPeerGame());
  },

  closeJoinPeerGame: () => {
    dispatch(closeJoinPeerGame());
    dispatch(openMainMenu());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinPeerGameModal);
