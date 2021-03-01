import { connect } from 'react-redux';

import { resetDeck } from '../redux/actions/deal';
import { resetHand } from '../redux/actions/hand';
import { openHostPeerGame, openJoinPeerGame } from '../redux/actions/ui';

import MainMenuModal from './MainMenuModal';

function mapStateToProps(state) {
  const { deal } = state;
  const { deck } = deal;

  return {
    gameInProgress: !!deck?.length,
  };
}

const mapDispatchToProps = (dispatch) => ({
  startGame: () => {
    dispatch(resetDeck());
    dispatch(resetHand());
  },

  hostPeerGame: () => {
    dispatch(openHostPeerGame());
  },

  joinPeerGame: () => {
    dispatch(openJoinPeerGame());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuModal);
