export const RECEIVE_GEOCODE = "RECEIVE_GEOCODE";
import * as GeocodeApiUtil from '../util/geocode_api_util';
import { fetchWeather } from './weather_actions';
import { receiveErrors } from './error_actions';
import { setLoadingState } from './loading_actions';

const handleErrors = (dispatch) => {
  return (errors) => {
    dispatch(setLoadingState(false));
    dispatch(receiveErrors(errors.responseJSON));
  };
};

const startRetrievingWeather = (dispatch, address) => {
  return (geocode) => {
    const location = geocode.results[0].geometry.location;
    location.address = geocode.results[0].formatted_address;
    if (address.date) location.date = address.date;
    // Future logic, change type of spinner, let user know geocode was successful and now fetching weather
    return dispatch(fetchWeather(location));
  };
};

export const fetchGeocode = (address) => dispatch => {
  return (
    GeocodeApiUtil.fetchGeocode(address)
    .then(startRetrievingWeather(dispatch, address), handleErrors(dispatch))
  );
};
