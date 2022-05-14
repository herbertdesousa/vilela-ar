import React from 'react';

import { FinanceProvider } from './finance/provider';

const Hooks: React.FC = ({ children }) => {
  return <FinanceProvider>{children}</FinanceProvider>;
};

export default Hooks;
