import { createContext } from 'react';
import { IReceiptRefsContextData } from './types';

export const ReceiptRefsContext = createContext<IReceiptRefsContextData>(
  {} as IReceiptRefsContextData,
);
