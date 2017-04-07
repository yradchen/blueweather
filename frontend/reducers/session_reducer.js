import { RECEIVE_CURRENT_USER, LOGOUT } from '../actions/session_actions';

const _nullUser = Object.freeze({
  currentUser: null
});

const SessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { currentUser : action.currentUser };
    default:
      return state;
  }
};

export default SessionReducer;
