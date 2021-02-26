import { OPEN_MAIN_MENU, CLOSE_MAIN_MENU } from '../constants/ui';

export const initialState = {
  mainMenuOpen: true,
};

const openMainMenu = (state) => ({
  ...state,
  mainMenuOpen: true,
});

const closeMainMenu = (state) => ({
  ...state,
  mainMenuOpen: false,
});

const reducer = (state = initialState, action = '') => {
  switch (action.type) {
    case OPEN_MAIN_MENU:
      return openMainMenu(state);

    case CLOSE_MAIN_MENU:
      return closeMainMenu(state);

    default:
      return state;
  }
};

export default reducer;
