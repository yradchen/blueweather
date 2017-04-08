export const RECEIVE_LOADING_STATE = "RECEIVE_LOADING_STATE";

const receiveLoadingState = (loading) => ({
  type: RECEIVE_LOADING_STATE,
  loading
});

export const setLoadingState = (boolean) => dispatch => (
  dispatch(receiveLoadingState(boolean))
);
