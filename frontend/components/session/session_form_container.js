import { connect } from 'react-redux';
// import { login, logout, signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => {
  debugger
  return {};
  // return {
  //   loggedIn: Boolean(state.session.currentUser),
  //   errors: state.errors
  // };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
  // return {
  //   login: user => dispatch(login(user))
  // };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
