import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import ErrorReducer from './error_reducer';
import UserReducer from './user_reducer';
import WeatherReducer from './weather_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  errors: ErrorReducer,
  user: UserReducer,
  weather: WeatherReducer
});

export default RootReducer;
