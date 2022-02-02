import { useContext } from 'react';

import { ICustomersContextData } from './types';
import { CustomersContext } from './context';

export function useCustomers(): ICustomersContextData {
  const context = useContext(CustomersContext);

  if (!context) {
    throw new Error('useCustomers must be used within an CustomersContext');
  }

  return context;
}
