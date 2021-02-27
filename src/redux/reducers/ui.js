import {
  OPEN_MAIN_MENU,
  CLOSE_MAIN_MENU,
  OPEN_HOST_PEER_GAME,
  CLOSE_HOST_PEER_GAME,
  OPEN_JOIN_PEER_GAME,
  CLOSE_JOIN_PEER_GAME,
} from '../constants/ui';

export const initialState = {
  mainMenuOpen: true,
  hostPeerGameOpen: false,
  joinPeerGameOpen: false,
};

const openMainMenu = (state) => ({
  ...state,
  mainMenuOpen: true,
});

const closeMainMenu = (state) => ({
  ...state,
  mainMenuOpen: false,
});

const openHostPeerGame = (state) => ({
  ...state,
  hostPeerGameOpen: true,
});

const closeHostPeerGame = (state) => ({
  ...state,
  hostPeerGameOpen: false,
});

const openJoinPeerGame = (state) => ({
  ...state,
  joinPeerGameOpen: true,
});

const closeJoinPeerGame = (state) => ({
  ...state,
  joinPeerGameOpen: false,
});

const reducer = (state = initialState, action = '') => {
  switch (action.type) {
    case OPEN_MAIN_MENU:
      return openMainMenu(state);

    case CLOSE_MAIN_MENU:
      return closeMainMenu(state);

    case OPEN_HOST_PEER_GAME:
      return openHostPeerGame(state);

    case CLOSE_HOST_PEER_GAME:
      return closeHostPeerGame(state);

    case OPEN_JOIN_PEER_GAME:
      return openJoinPeerGame(state);

    case CLOSE_JOIN_PEER_GAME:
      return closeJoinPeerGame(state);

    default:
      return state;
  }
};

export default reducer;
