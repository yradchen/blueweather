import { connect } from 'react-redux';
import HomePage from './home_page';
import { fetchWeather } from '../../actions/weather_actions';
import { createSearch, fetchSearches } from '../../actions/search_actions';
const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    searches: Object.keys(state.searches).map(id => state.searches[id])
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchWeather: (lat, long, date) => dispatch(fetchWeather(lat, long, date)),
    createSearch: (search) => dispatch(createSearch(search)),
    fetchSearches: () => dispatch(fetchSearches())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
