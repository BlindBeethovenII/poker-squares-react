import { connect } from 'react-redux';

import { openMainMenu } from '../redux/actions/ui';

import MainMenuButton from './MainMenuButton';

function mapStateToProps(state) {
  const { deal } = state;
  const { deck } = deal;

  return {
    gameInProgress: !!deck?.length,
  };
}

const mapDispatchToProps = (dispatch) => ({
  openMainMenu: () => {
    dispatch(openMainMenu());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuButton);
