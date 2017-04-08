import { connect } from 'react-redux';
import HomePage from './home_page';
import { fetchWeather } from '../../actions/weather_actions';
import { createSearch, fetchSearches } from '../../actions/search_actions';
import { fetchGeocode } from '../../actions/geocode_actions';
import { createErrors } from '../../actions/error_actions';
import { setLoadingState } from '../../actions/loading_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    searches: Object.keys(state.searches).reverse().map(id => state.searches[id]),
    errors: state.errors
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchWeather: (lat, long, date) => dispatch(fetchWeather(lat, long, date)),
    createSearch: (search) => dispatch(createSearch(search)),
    fetchSearches: () => dispatch(fetchSearches()),
    fetchGeocode: (location) => dispatch(fetchGeocode(location)),
    createErrors: (errors) => dispatch(createErrors(errors)),
    setLoadingState: (boolean) => dispatch(setLoadingState(boolean))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
