import React from 'react';
import Image from 'next/image';

const Brands: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center py-12">
      <div
        style={{ zIndex: -1, height: '60%' }}
        className="absolute top-0 w-full bg-accent-2"
      />
      <h3 className="font-semibold text-2xl">MARCAS</h3>

      <ul className="flex mt-4 px-6 max-w-full overflow-x-scroll no-scroll">
        <li className="rounded-sm mr-4">
          <Image src="/home/brands-logos/daikin.png" width={192} height={80} />
        </li>
        <li className="rounded-sm mr-4">
          <Image src="/home/brands-logos/fujitsu.png" width={192} height={80} />
        </li>
        <li className="rounded-sm mr-4">
          <Image src="/home/brands-logos/lg.png" width={192} height={80} />
        </li>
        <li className="rounded-sm mr-4">
          <Image src="/home/brands-logos/samsung.png" width={192} height={80} />
        </li>
      </ul>
    </section>
  );
};

export default Brands;
