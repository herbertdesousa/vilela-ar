import { Formik } from 'formik';
import React from 'react';

import { v4 } from 'uuid';

import { DocumentProvider } from './provider';
import { IDocumentFormData } from './types/DocumentFormData';

export const DOCUMENT_BLOCK_INITIALS: IDocumentFormData = {
  type: 'recibo',
  title: 'Sem Título',
  add_bank_details_page: false,
  layers: [
    {
      id: v4(),
      type: 'header',
      title: 'Cabeçalho',
      isLock: true,
      date: new Date(Date.now()),
      representative_engineer: '',
      order: -100000,
      customer: {
        id: '',
        name: '',
        document: '',
        representative: '',
        address: {
          id: '',
        },
      },
    },
    {
      id: v4(),
      type: 'block',
      title: 'Bloco I',
      order: 0,
      description: '',
      price: {
        value: '',
        sum_price_in_payment: false,
      },
      materials: [
        'Cano de Cobre',
        'Cabo PP (4 vias)',
        'Isolamento térmico',
        'Buchas',
      ],
      places: [
        {
          id: v4(),
          floor: 'Pavimento I',
          room: 'Suite I',
          devices: [
            {
              id: v4(),
              quantity: 1,
              type: 'ar condicionado',
              brand: 'Fujitsu',
              capacity: '24.000BTUS',
              mode: 'Split',
            },
          ],
        },
        {
          id: v4(),
          floor: '',
          room: 'Suite I',
          devices: [
            {
              id: v4(),
              quantity: 1,
              type: 'ar condicionado',
              brand: 'Fujitsu',
              capacity: '24.000BTUS',
              mode: 'Split',
            },
          ],
        },
      ],
    },
    {
      id: v4(),
      type: 'payment',
      title: 'Pagamento',
      isLock: true,
      order: 100000,
      comments: '',
      sum_all_prices: true,
    },
  ],
};

const DocumentWrapper: React.FC = ({ children }) => {
  return (
    <Formik
      initialValues={DOCUMENT_BLOCK_INITIALS}
      onSubmit={(data: IDocumentFormData) => console.log(data)}
    >
      <DocumentProvider>{children}</DocumentProvider>
    </Formik>
  );
};

export default DocumentWrapper;
