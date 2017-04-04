import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app'
import SessionFormContainer from './session/session_form_container';
import { Provider } from 'react-redux';

const Root = ({ store }) => {
  return (
    <Provider store={ store }>
      <Router history={ hashHistory } onUpdate={ () => window.scrollTo(0, 0) } >
        <Route path="/" component={ SessionFormContainer } />
      </Router>
    </Provider>
  )
}

export default Root;
