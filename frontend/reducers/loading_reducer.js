import { RECEIVE_LOADING_STATE } from '../actions/loading_actions';
import merge from 'lodash/merge';
const LoadingReducer = (state = { loading: false }, action) => {
  let newState;
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_LOADING_STATE:
      newState = merge({}, state);
      newState.loading = action.loading;
      return newState;
    default:
      return state;
  }
};

export default LoadingReducer;
