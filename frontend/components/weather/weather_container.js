import { connect } from 'react-redux';
import CurrentWeather from './current_weather';

const mapStateToProps = (state, ownProps) => {
  return {
    weather: state.weather
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
