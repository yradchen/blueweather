import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app'
import SessionFormContainer from './session/session_form_container';
import { Provider } from 'react-redux';

const Root = ({ store }) => {
  const _redirectIfLoggedIn = (store) => {
    const currentUser = store.getState().session.username;
    return (nextState, replace) => {
      if (currentUser) {
        replace('/');
      }
    }
  }

  return (
    <Provider store={ store }>
      <Router history={ hashHistory } onUpdate={ () => window.scrollTo(0, 0) } >
        <Route path="/" component={ App }>
          <Route onEnter={_redirectIfLoggedIn(store)}>
            <Route path="login" component={SessionFormContainer} />
            <Route path="signup" component={SessionFormContainer} />
          </Route>
        </Route>
      </Router>
    </Provider>
  )
}

export default Root;
