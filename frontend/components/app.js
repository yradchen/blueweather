import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import Footer from './footer/footer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    loading: state.visibility.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const spinner = (loading) => {
  if (loading) {
    return (
      <section>
        <div className="icon rainy">
          <div className="cloud"></div>
          <div className="rain"></div>
        </div>
        <div className="grey-loader"></div>
      </section>
    )
  }
}


const App = ({ children, loading }) => {
  return (
    <main id="main">
      {spinner(loading)}
      <NavBarContainer />
      <div id="body">
        { children }
      </div>
      <Footer />
    </main>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
