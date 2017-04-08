export const RECEIVE_WEATHER = "RECEIVE_WEATHER";
import * as WeatherApiUtil from '../util/weather_api_util';
import { receiveErrors } from './error_actions';

const handleErrors = (dispatch) => {
  return (errors) => {
    dispatch(setLoadingState(false));
    dispatch(receiveErrors(errors.responseJSON));
  };
};

export const receiveWeather = (weather) => ({
  type: RECEIVE_WEATHER,
  weather
});

export const fetchWeather = (geocode) => dispatch => {
  return (
    WeatherApiUtil.fetchWeather(geocode)
    .then(weather => dispatch(receiveWeather(weather)),
    handleErrors(dispatch))
  );
};
