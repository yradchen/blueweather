import * as SearchAPIUtil from '../util/search_api_util';

export const RECEIVE_ALL_SEARCHES = 'RECEIVE_ALL_SEARCHES';
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';

const receiveAllSearches = (searches) => ({
  type: RECEIVE_ALL_SEARCHES,
  searches
});

const receiveSearch = (search) => ({
  type: RECEIVE_SEARCH,
  search
});

export const fetchSearches = () => dispatch => (
  SearchAPIUtil.fetchSearches().then(
    searches => dispatch(receiveAllSearches(searches))
  )
);

export const createSearch = (search) => dispatch => (
  SearchAPIUtil.createSearch(search).then(
    search => dispatch(receiveSearch(search))
  )
);
