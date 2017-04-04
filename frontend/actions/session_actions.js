import * as SessionAPIUtil from '../util/session_api_util';
import { receiveErrors } from './error_actions';
export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
});

export const login = (user) => dispatch => (
  SessionAPIUtil.login(user)
    .then(currentUser => dispatch(receiveUser(currentUser)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    )
);

export const signup = (user) => dispatch => (
  SessionAPIUtil.signup(user)
    .then(currentUser => dispatch(receiveUser(currentUser)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    )
);

export const logout = () => dispatch => (
  SessionAPIUtil.logout().then(user => dispatch(receiveCurrentUser(null)))
);
