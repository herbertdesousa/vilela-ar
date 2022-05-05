import React from 'react';

import { MdDelete } from 'react-icons/md';
import { Formik } from 'formik';

import { Button, Switch, TextField } from '@/components';

const SaveForm: React.FC = () => {
  return (
    <div className="pt-20 pl-16" style={{ width: 512 }}>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-merriweather text-accent-6 font-bold">
          Atualizar
        </h1>

        <button
          type="button"
          className="flex items-center text-accent-6 font-medium"
        >
          <MdDelete size={20} className="mr-1 text-red" />
          Deletar
        </button>
      </div>

      <div className="mt-12">
        <Formik
          initialValues={{
            date: '',
            type: 'income',
            description: '',
            value: '',
          }}
          onSubmit={dt => console.log(dt)}
        >
          {({ submitForm }) => (
            <>
              <TextField
                name="value"
                label="Valor (R$)"
                isRequired
                placeholder="Valor"
              />
              <Switch
                name="type"
                label="Tipo"
                isRequired
                containerClassName="mt-4"
                data={{
                  option1: { label: 'Entrada', value: 'income' },
                  option2: { label: 'Saída', value: 'outcome' },
                }}
              />
              <TextField
                name="date"
                label="Data"
                containerClassName="mt-4"
                isRequired
                placeholder="Descrição da Financia"
              />
              <TextField
                name="description"
                type="textarea"
                label="Descrição"
                containerClassName="mt-4"
                placeholder="Descrição da Financia"
              />
              <Button className="w-full mt-8" onClick={submitForm}>
                Editar Finância
              </Button>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SaveForm;
