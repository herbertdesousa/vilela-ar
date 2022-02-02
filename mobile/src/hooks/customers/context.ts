import { createContext } from 'react';
import { ICustomersContextData } from './types';

export const CustomersContext = createContext<ICustomersContextData>(
  {} as ICustomersContextData,
);
