import { ContactButton, Grid } from '@/components';
import React from 'react';

import { MdRoom } from 'react-icons/md';

const Footer: React.FC = () => {
  return (
    <footer className="bg-accent-4">
      <Grid>
        <div
          className="
            col-span-11 flex-col flex justify-between items-start py-14
            md:flex-row md:items-center lg:col-start-2
          "
        >
          <div className="text-accent-0 font-medium flex items-center text-lg mb-6 md:mb-0">
            <MdRoom size={24} />
            &nbsp;&nbsp;SÃO PAULO
          </div>
          <ContactButton size="sm" variant="light">
            Enviar Mensagem
          </ContactButton>
        </div>
      </Grid>
      <div
        className="
          bg-accent-5 text-accent-0 py-2 flex items-center justify-center uppercase text-center
          text-xs md:text-sm lg:text-base
        "
      >
        Copyright © 2022 vilela ar. Todos os direitos reservados. CNPJ:
        29.429.191/0001-93
      </div>
    </footer>
  );
};

export default Footer;
