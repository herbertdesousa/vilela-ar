import Image from 'next/image';
import React from 'react';

import { MdArrowDownward } from 'react-icons/md';

import { ContactButton } from '@/components';

const HomeHero: React.FC = () => {
  return (
    <header className="relative h-screen">
      <div className="absolute top-4 left-4">
        <Image src="/logo.svg" width="56" height="56" className="z-10" />
      </div>

      <Image
        src="/home/hero.jpg"
        layout="fill"
        objectFit="cover"
        objectPosition="45%"
      />

      <div className="absolute h-screen w-full flex flex-col items-center justify-center">
        <h1 className="text-accent-0 text-6xl font-semibold">Vilela ar</h1>
        <p className="text-accent-2 mt-2">A temperatura ideal para você</p>

        <ContactButton variant="light" className="mt-16">
          Chamar no Whatsapp
        </ContactButton>
      </div>

      <div className="w-full flex justify-center absolute z-10 bottom-4">
        <MdArrowDownward size={24} className=" text-accent-3" />
      </div>
    </header>
  );
};

export default HomeHero;
