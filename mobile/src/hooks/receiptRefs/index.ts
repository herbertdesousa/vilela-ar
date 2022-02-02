import { useContext } from 'react';

import { IReceiptRefsContextData } from './types';
import { ReceiptRefsContext } from './context';

export function useReceiptRefs(): IReceiptRefsContextData {
  const context = useContext(ReceiptRefsContext);

  if (!context) {
    throw new Error('useReceiptRefs must be used within an ReceiptRefsContext');
  }

  return context;
}
