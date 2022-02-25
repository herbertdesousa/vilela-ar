import React from 'react';

import * as HomeModules from '../modules/home';

const Home: React.FC = () => {
  return (
    <>
      <HomeModules.Hero />
      <HomeModules.Brands />
      <HomeModules.Services />
      <HomeModules.Blog />
      <HomeModules.Footer />
    </>
  );
};

export default Home;
