import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import Footer from './footer/footer';
import HomePageContainer from './home_page/home_page_container';

const App = ({ children }) => {
  return (
    <div>
      <NavBarContainer />
      <main className="main">
        { children }
        <HomePageContainer />
      </main>
      <Footer />
    </div>
  );
};


export default App;
