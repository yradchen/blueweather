import { connect } from 'react-redux';
import { login, logout, signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: Boolean(state.session.username),
    formType: ownProps.route.path,
    errors: state.errors
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const action = ownProps.route.path === "login" ? login : signup;
  return {
    action: user => dispatch(action(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
