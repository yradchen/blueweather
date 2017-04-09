export const RECEIVE_WEATHER = "RECEIVE_WEATHER";
import * as WeatherApiUtil from '../util/weather_api_util';
import { receiveErrors } from './error_actions';
import { setLoadingState } from './loading_actions';

export const receiveWeather = (weather) => ({
  type: RECEIVE_WEATHER,
  weather
});

const handleReceivingWeather = (dispatch) => {
  return (weather) => {
    dispatch(setLoadingState(false));
    dispatch(receiveWeather(weather));
  };
};

const handleErrors = (dispatch) => {
  return (errors) => {
    dispatch(setLoadingState(false));
    dispatch(receiveErrors(errors.responseJSON));
  };
};

export const fetchWeather = (geocode) => dispatch => {
  return (
    WeatherApiUtil.fetchWeather(geocode)
    .then(handleReceivingWeather(dispatch),
    handleErrors(dispatch))
  );
};
