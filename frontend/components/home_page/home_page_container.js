import { connect } from 'react-redux';
import HomePage from './home_page';
import { fetchWeather } from '../../actions/weather_actions';
import { createSearch, fetchSearches } from '../../actions/search_actions';
import { fetchGeocode } from '../../actions/geocode_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    searches: Object.keys(state.searches).reverse().map(id => state.searches[id])
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchWeather: (lat, long, date) => dispatch(fetchWeather(lat, long, date)),
    createSearch: (search) => dispatch(createSearch(search)),
    fetchSearches: () => dispatch(fetchSearches()),
    fetchGeocode: (location) => dispatch(fetchGeocode(location))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
