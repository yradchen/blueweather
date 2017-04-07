import { RECEIVE_ALL_SEARCHES, RECEIVE_SEARCH } from '../actions/search_actions';
import merge from 'lodash/merge';

const SearchReducer = (state = {}, action) => {

  let newState;
  switch (action.type) {
    case RECEIVE_ALL_SEARCHES:
      return action.searches;
    case RECEIVE_SEARCH:
      debugger
      newState = merge({}, state);
      return newState;
    default:
      return state;
  }
};

export default SearchReducer;
