import { connect } from 'react-redux';
import { login, logout, signup } from '../../actions/session_actions';
import SessionForm from './session_form';
import { clearErrors } from '../../actions/error_actions';
const mapStateToProps = (state, ownProps) => {

  const formType = ownProps.route.path.slice(1);
  return {
    loggedIn: Boolean(state.session.currentUser),
    formType: formType,
    errors: state.errors
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const action = ownProps.route.path === "/login" ? login : signup;
  return {
    action: (user) => dispatch(action(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
