import React from 'react';

import { ContactButton, Grid } from '@/components';

const Services: React.FC = () => {
  return (
    <Grid>
      <section className="col-start-1 col-span-8 lg:col-start-3">
        <ul>
          {[1, 2, 3].map(item => (
            <li key={item} className="flex flex-col mt-10 md:flex-row">
              <div className="col-span-4 w-full bg-accent-3 rounded h-32 md:h-80" />
              <div
                className="
                  flex flex-col justify-between w-full mt-2
                  md:mt-0 md:ml-4
                "
              >
                <div>
                  <strong className="text-primary text-sm mb-0.5">
                    SERVIÇOS
                  </strong>
                  <h2 className="text-2xl font-semibold mb-4 mt-1 md:mb-6 md:text-3xl">
                    Instalação
                  </h2>
                  <p className="text-accent-4 mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Orci, ut nisl dolor consectetur mi viverra suspendisse
                    sollicitudin risus. Feugiat eu, eget ut scelerisque viverra.
                    Id cursus ut mauris faucibus.
                  </p>
                </div>

                <ContactButton>solicitar instalação</ContactButton>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Grid>
  );
};

export default Services;
