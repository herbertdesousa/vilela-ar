import React from 'react';

// import { Container } from './styles';

const Brands: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center py-12">
      <div
        style={{ zIndex: -1, height: '60%' }}
        className="absolute top-0 w-full bg-accent-2"
      />
      <h3 className="font-semibold text-2xl">MARCAS</h3>

      <ul className="flex mt-4 px-6 max-w-full overflow-x-scroll no-scroll">
        <li>
          <div
            style={{ width: 192, height: 80 }}
            className="bg-accent-3 rounded-sm mr-4"
          />
        </li>
        <li>
          <div
            style={{ width: 192, height: 80 }}
            className="bg-accent-3 rounded-sm mr-4"
          />
        </li>
        <li>
          <div
            style={{ width: 192, height: 80 }}
            className="bg-accent-3 rounded-sm mr-4"
          />
        </li>
        <li>
          <div
            style={{ width: 192, height: 80 }}
            className="bg-accent-3 rounded-sm"
          />
        </li>
      </ul>
    </section>
  );
};

export default Brands;
