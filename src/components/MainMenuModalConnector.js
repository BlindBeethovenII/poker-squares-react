import { connect } from 'react-redux';

import { resetDeck } from '../redux/actions/deal';
import { resetHand } from '../redux/actions/hand';
import { closeMainMenu } from '../redux/actions/ui';

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
  resetBoard: () => {
    dispatch(resetDeck());
    dispatch(resetHand());
  },

  closeMainMenu: () => {
    dispatch(closeMainMenu());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuModal);
