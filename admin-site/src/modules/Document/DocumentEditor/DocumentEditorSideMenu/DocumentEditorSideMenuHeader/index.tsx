import React from 'react';
import { MdChevronLeft } from 'react-icons/md';
import { useRouter } from 'next/router';

import { Select, TextField, DatePicker, ClosableList } from '@/components';

const DocumentEditorSideMenuHeader: React.FC = () => {
  const router = useRouter();

  return (
    <section
      className="min-h-full py-16 px-10 overflow-x-scroll no-scroll"
      style={{ width: 512 }}
    >
      <div className="flex items-center mb-10">
        <button type="button" onClick={router.back}>
          <MdChevronLeft size={24} className="text-accent-6 mr-6" />
        </button>
        <h1 className="font-merriweather text-4xl font-bold">Cabeçalho</h1>
      </div>

      <DatePicker name="layers[0].date" label="Data" isRequired />
      <Select
        name="layers[0].representative_engineer"
        label="Arquiteto"
        className="w-full mt-4"
        placeholder="Selecione o engenheiro ou arquiteto"
        data={[
          {
            label: 'Rodrigo',
            value: 'id-123',
          },
          {
            label: 'Carlos',
            value: 'id-456',
          },
        ]}
      />
      <ClosableList title="Cliente" containerClassName="mt-8">
        <Select
          name="layers[0].customer.name"
          label="Nome"
          placeholder="Selecione o cliente"
          data={[{ label: 'ExPak', value: 'id-123' }]}
        />
        <TextField
          name="layers[0].customer.document"
          label="CPF / CNPJ"
          containerClassName="mt-4"
          placeholder="Documento"
          disabled
        />
        <Select
          name="layers[0].customer.representative"
          label="Representante"
          placeholder="Selecione o representante"
          data={[{ label: 'Marcos', value: 'id-123' }]}
          className="mt-4"
        />
        <Select
          name="layers[0].customer.address"
          placeholder="Selecione o endereço"
          label="Endereço"
          data={[
            {
              label:
                'Rua Cabo Oscar Rossini 808 A, Parque Novo Mundo, São Paulo - SP',
              value: 'id-123',
            },
          ]}
          className="mt-4"
        />
      </ClosableList>
    </section>
  );
};

export default DocumentEditorSideMenuHeader;
