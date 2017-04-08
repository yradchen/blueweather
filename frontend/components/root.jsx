import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app'
import SessionFormContainer from './session/session_form_container';
import HomePageContainer from './home_page/home_page_container';
import { Provider } from 'react-redux';
import WeatherContainer from './weather/weather_container';
import { clearErrors } from '../actions/error_actions';

const Root = ({ store }) => {
  const _redirectIfLoggedIn = (store) => {
    return (nextState, replace) => {
      const currentUser = store.getState().session.currentUser
      if (currentUser) {

        replace('/');
      }
    }
  }
  const _clearErrors = (store) => {

    return (currentRoute, nextRoute) => {
      if (currentRoute.location.pathname !== nextRoute.location.pathname) {
        store.dispatch(clearErrors());
      }
    }
  }

  return (
    <Provider store={ store }>
      <Router history={ hashHistory } onUpdate={ () => window.scrollTo(0, 0) } >
        <Route component={ App } onChange={_clearErrors(store)}>

            <Route path="/current/:location" component={WeatherContainer} />
            <Route path="/historic/:location" component={WeatherContainer} />
            <Route path="/" component={HomePageContainer} />

            <Route onEnter={_redirectIfLoggedIn(store)}>
              <Route path="/login" component={SessionFormContainer} />
              <Route path="/signup" component={SessionFormContainer} />
            </Route>

        </Route>
      </Router>
    </Provider>
  )
}

export default Root;
