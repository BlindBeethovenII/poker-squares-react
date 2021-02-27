import { connect } from 'react-redux';

import { resetDeck } from '../redux/actions/deal';
import { resetHand } from '../redux/actions/hand';
import { closeMainMenu, openHostPeerGame } from '../redux/actions/ui';

import MainMenuModal from './MainMenuModal';

function mapStateToProps(state) {
  const { ui, deal } = state;
  const { mainMenuOpen } = ui;
  const { deck } = deal;

  return {
    mainMenuOpen,
    gameInProgress: !!deck?.length,
  };
}

const mapDispatchToProps = (dispatch) => ({
  startGame: () => {
    dispatch(resetDeck());
    dispatch(resetHand());
    dispatch(closeMainMenu());
  },

  closeMainMenu: () => {
    dispatch(closeMainMenu());
  },

  hostPeerGame: () => {
    dispatch(closeMainMenu());
    dispatch(openHostPeerGame());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuModal);
