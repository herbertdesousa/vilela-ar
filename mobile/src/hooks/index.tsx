import React from 'react';

import { CustomersProvider } from './customers/provider';
import { FinancesProvider } from './finances/provider';
import { ReceiptRefsProvider } from './receiptRefs/provider';

const Hooks: React.FC = ({ children }) => {
  return (
    <CustomersProvider>
      <FinancesProvider>
        <ReceiptRefsProvider>{children}</ReceiptRefsProvider>
      </FinancesProvider>
    </CustomersProvider>
  );
};

export default Hooks;
