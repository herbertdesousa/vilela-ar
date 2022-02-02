import React, { useCallback, useState } from 'react';

import resources from '@/services/resources';
import api from '@/services/api';
import useSWR from 'swr';

import { ICustomerDTO } from '@/dtos/ICustomerDTO';

import { CustomersContext } from './context';
import { ISaveCustomer } from './types';

export const CustomersProvider: React.FC = ({ children }) => {
  const { data, mutate, error } = useSWR<ICustomerDTO[]>(resources.customers);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await mutate();
    setIsRefreshing(false);
  }, [mutate]);

  const deleteCustomer = useCallback(
    async (id: string) => {
      await api.delete(resources.customers, { params: { id } });
      await mutate();
    },
    [mutate],
  );

  const createCustomer = useCallback(
    async (formData: ISaveCustomer) => {
      await api.post(resources.customers, formData);
      await mutate();
    },
    [mutate],
  );

  const updateCustomer = useCallback(
    async (id: string, formData: ISaveCustomer) => {
      await api.put(resources.customers, formData, { params: { id } });
      await mutate();
    },
    [mutate],
  );

  return (
    <CustomersContext.Provider
      value={{
        customers: data || [],
        isLoading: !data && !error,
        isRefreshing,
        onRefresh,
        deleteCustomer,
        createCustomer,
        updateCustomer,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};
