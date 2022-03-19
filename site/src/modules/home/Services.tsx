import React from 'react';
import Image from 'next/image';

import { ContactButton, Grid } from '@/components';

const data = [
  {
    id: 'id-0',
    title: 'Instalação',
    text: 'Solicite uma instalação para sua residência ou empresa. Oferencendo a melhor instalação de ar condicionado existente para pessoas físicas ou jurídicas.',
    image: '/home/services/installing.jpg',
    button: {
      text: 'solicitar instalação',
      messageToSend:
        'Olá, vim pelo site e gostaria de solicitar uma instalação!',
    },
  },
  {
    id: 'id-1',
    title: 'Infraestrutura',
    text: 'Está pensando em executar um projeto em seu apartamento resindêncial, empresa, casa... A Vilela Ar vai te ajudar com toda a infraestrutura dos aparelhos de ar condicionado.',
    image: '/home/services/outside.jpg',
    button: {
      text: 'solicitar infraestrutura',
      messageToSend:
        'Olá, vim pelo site e gostaria de solicitar uma infraestrutura',
    },
  },
  {
    id: 'id-2',
    title: 'Conserto',
    text: 'Seu aparelho quebrou e precisa de conserto? Contate a Vilela Ar para ajudarmos com o problema seja qual for!',
    image: '/home/services/broken.jpg',
    button: {
      text: 'solicitar conserto',
      messageToSend:
        'Olá, vim pelo site e gostaria de solicitar uma infraestrutura',
    },
  },
];

const Services: React.FC = () => {
  return (
    <Grid>
      <section className="col-start-1 col-span-8 lg:col-start-3">
        <ul>
          {data.map((item, index) => (
            <li
              key={item.id}
              className={`
                flex flex-col mt-24
                ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}
              `}
            >
              <div className="relative col-span-4 w-full h-32 md:h-80">
                <Image
                  src={item.image}
                  layout="fill"
                  className="rounded"
                  objectFit="cover"
                />
              </div>
              <div
                className={`
                  flex flex-col justify-between w-full mt-8
                  md:mt-0 ${index % 2 === 0 ? 'md:ml-4' : 'md:mr-4'}
                `}
              >
                <div>
                  <strong className="text-primary text-sm mb-0.5">
                    SERVIÇOS
                  </strong>
                  <h2 className="text-2xl font-semibold mb-4 mt-1 md:mb-6 md:text-3xl">
                    {item.title}
                  </h2>
                  <p className="text-accent-4 mb-6">{item.text}</p>
                </div>

                <ContactButton messageToSend={item.button.messageToSend}>
                  {item.button.text}
                </ContactButton>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Grid>
  );
};

export default Services;
