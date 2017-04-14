export const RECEIVE_GEOCODE = "RECEIVE_GEOCODE";
import * as ReverseGeolocationApiUtil from '../util/reverse_geolocation_api_util';
import { fetchWeather } from './weather_actions';

const handleErrors = (dispatch) => {
  return (errors) => {
    dispatch(setLoadingState(false));
    dispatch(receiveErrors(errors.responseJSON));
  };
};

const startRetrievingWeather = (dispatch, location) => {
  return (geocode) => {
    location.address = geocode.results[0].formatted_address;
    return dispatch(fetchWeather(location));

  };
};

export const fetchReverseGeocode = (location) => dispatch => {
  return (
    ReverseGeolocationApiUtil.fetchAddress(location)
    .then(startRetrievingWeather(dispatch, location), handleErrors(dispatch))
  );
};
