import { connect } from 'react-redux';
import HistoricWeather from './historic_weather';


const mapStateToProps = (state, ownProps) => {
  return {
    weather: state.weather
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoricWeather);
