import { connect } from 'react-redux';

import MainMenuButton from './MainMenuButton';

function mapStateToProps(state) {
  const { deal } = state;
  const { deck } = deal;

  return {
    gameInProgress: !!deck?.length,
  };
}

export default connect(mapStateToProps, undefined)(MainMenuButton);
