import React from 'react';

import { Nav } from '@/components';
import * as HomeModules from '../modules/home';

const Home: React.FC = () => {
  return (
    <>
      <Nav active="home" />
      <HomeModules.Hero />
      <div className="my-4 h-24 w-full bg-accent-2" />
      {/* <HomeModules.Brands /> */}
      <HomeModules.Services />
      {/* <HomeModules.Blog /> */}
      <HomeModules.Footer />
    </>
  );
};

export default Home;
