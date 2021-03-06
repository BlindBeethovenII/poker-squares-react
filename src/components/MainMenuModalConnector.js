import { connect } from 'react-redux';

import { resetDeck } from '../redux/actions/deal';

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
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuModal);
