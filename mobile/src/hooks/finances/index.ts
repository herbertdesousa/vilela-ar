import { useContext } from 'react';

import { IFinancesContextData } from './types';
import { FinancesContext } from './context';

export function useFinances(): IFinancesContextData {
  const context = useContext(FinancesContext);

  if (!context) {
    throw new Error('useFinances must be used within an FinancesContext');
  }

  return context;
}
