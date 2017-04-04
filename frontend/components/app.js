import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import Footer from './footer/footer';

const App = ({ children }) => {
  return (
    <div>
      <NavBarContainer />
      <main className="main">
        { children }
      </main>
      <Footer />
    </div>
  );
};


export default App;
