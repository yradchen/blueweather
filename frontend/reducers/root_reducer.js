import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import ErrorReducer from './error_reducer';
import WeatherReducer from './weather_reducer';
import SearchReducer from './search_reducer';
import LoadingReducer from './loading_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  errors: ErrorReducer,
  weather: WeatherReducer,
  searches: SearchReducer,
  visibility: LoadingReducer
});

export default RootReducer;
