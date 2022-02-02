import React, { useCallback } from 'react';

import resources from '@/services/resources';
import api from '@/services/api';
import useSWRInfinite from 'swr/infinite';

import { IFinanceDTO } from '@/dtos/IFinanceDTO';

import { FinancesContext } from './context';
import { ISaveFinance } from './types';

const getKey = (pageIndex: number, previousPageData: IFinanceDTO[] | null) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end

  return `${resources.finances}?page=${pageIndex}&limit=20`;
};

export const FinancesProvider: React.FC = ({ children }) => {
  const { data, mutate, error, setSize, size, isValidating } =
    useSWRInfinite<IFinanceDTO[]>(getKey);

  const deleteFinance = useCallback(
    async (id: string, type: 'income' | 'outcome') => {
      await api.delete(resources.finances, { params: { id, type } });
      await mutate();
    },
    [mutate],
  );

  const createFinance = useCallback(
    async (formData: ISaveFinance) => {
      await api.post(resources.finances, formData);
      await mutate();
    },
    [mutate],
  );

  const updateFinance = useCallback(
    async (id: string, formData: ISaveFinance) => {
      await api.put(resources.finances, formData, { params: { id } });
      await mutate();
    },
    [mutate],
  );

  return (
    <FinancesContext.Provider
      value={{
        finances: data ? ([] as IFinanceDTO[]).concat(...data) : [],
        isInitialLoading: !data && !error,
        isLoadingMore: size > 0 && !!data && isValidating,
        isRefreshing: isValidating && !!data,

        nextPage: () => {
          setSize(state => state + 1);
        },
        onRefresh: async () => {
          await mutate();
        },
        deleteFinance,
        createFinance,
        updateFinance,
      }}
    >
      {children}
    </FinancesContext.Provider>
  );
};
