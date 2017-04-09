import { connect } from 'react-redux';
import CurrentWeather from './current_weather';
import { createSearch, fetchSearches } from '../../actions/search_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    weather: state.weather,
    currentUser: state.session.currentUser,
    location: ownProps.location.pathname
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createSearch: (search) => dispatch(createSearch(search))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
