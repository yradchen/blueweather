export const RECEIVE_GEOCODE = "RECEIVE_GEOCODE";
import * as GeocodeApiUtil from '../util/geocode_api_util';
import { fetchWeather } from './weather_actions';
import { receiveErrors } from './error_actions';

export const fetchGeocode = (address) => dispatch => {
  return (
    GeocodeApiUtil.fetchGeocode(address)
    .then(geocode => {
      const location = geocode.results[0].geometry.location;
      location.address = geocode.results[0].formatted_address;
      if (address.date) location.date = address.date;
      return dispatch(fetchWeather(location));
    }, errors => dispatch(receiveErrors(errors.responseJSON)))

  );
};
