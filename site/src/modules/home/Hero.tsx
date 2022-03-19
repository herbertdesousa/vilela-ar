import React from 'react';
import Image from 'next/image';

import { MdArrowDownward } from 'react-icons/md';

import { ContactButton, Grid } from '@/components';

const HomeHero: React.FC = () => {
  return (
    <header className="relative h-screen">
      {/* MOBILE AND TABLET */}
      <div className="block lg:hidden">
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

          <ContactButton
            variant="light"
            className="mt-16"
            messageToSend="Olá, vim pelo site e gostaria de fazer um orçamento"
          >
            Chamar no Whatsapp
          </ContactButton>
        </div>

        <div className="w-full flex justify-center absolute z-10 bottom-4">
          <MdArrowDownward size={24} className=" text-accent-3" />
        </div>
      </div>

      {/* DESKTOP ONLY */}
      <div className="hidden lg:block">
        <Grid className="flex h-screen" style={{ paddingRight: 0 }}>
          <div className="flex flex-col items-start justify-between py-16 col-span-4 z-10">
            <div className="h-14 w-14 transform-gpu transition-all hover:rotate-45">
              <Image src="/logo.svg" width="56" height="56" className="z-10" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-accent-6 text-6xl font-semibold">
                Vilela ar
              </h1>
              <p className="text-accent-4 text-xl mt-4">
                A temperatura ideal para você
              </p>

              <ContactButton
                className="mt-16"
                messageToSend="Olá, vim pelo site e gostaria de fazer um orçamento"
              >
                Chamar no Whatsapp
              </ContactButton>
            </div>
          </div>

          <div
            className="relative col-span-8"
            style={{
              boxShadow: '-32px -32px 0px #383A3F',
              height: 'calc(100% - 32px)',
            }}
          >
            <Image
              src="/home/hero.jpg"
              layout="fill"
              objectFit="cover"
              objectPosition="25%"
            />
          </div>
        </Grid>

        <div className="w-full flex justify-center absolute z-10 bottom-2">
          <MdArrowDownward size={20} className=" text-accent-5" />
        </div>
      </div>
    </header>
  );
};

export default HomeHero;
