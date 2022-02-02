import { createContext } from 'react';
import { IFinancesContextData } from './types';

export const FinancesContext = createContext<IFinancesContextData>(
  {} as IFinancesContextData,
);
