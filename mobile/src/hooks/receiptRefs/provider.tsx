import React, { useCallback, useRef, useState } from 'react';

import resources from '@/services/resources';
import api from '@/services/api';
import useSWR from 'swr';

import { ReceiptRefsContext } from './context';
import {
  IReceiptRefsCreateModalizeRef,
  IRefsData,
  ReceiptRefsTypes,
} from './types';
import ReceiptRefsCreateModalize from './ReceiptRefsCreateModalize';

export const ReceiptRefsProvider: React.FC = ({ children }) => {
  const { data, mutate, error } = useSWR<IRefsData[]>(resources.receipts.refs);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const receiptRefCreateRef = useRef<IReceiptRefsCreateModalizeRef>(null);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await mutate();
    setIsRefreshing(false);
  }, [mutate]);

  const deleteReceiptRef = useCallback(
    async (id: string, type: ReceiptRefsTypes) => {
      await api.delete(resources.receipts.refs, { params: { id, type } });
      await mutate();
    },
    [mutate],
  );

  const createReceiptRef = useCallback(
    async (name: string, type: ReceiptRefsTypes) => {
      await api.post(resources.receipts.refs, { name, type });
      await mutate();
    },
    [mutate],
  );

  return (
    <ReceiptRefsContext.Provider
      value={{
        receiptRefs: data || [],
        isLoading: !data && !error,
        isRefreshing,
        onRefresh,
        deleteReceiptRef,
        createReceiptRef,
        receiptRefCreateRef,
      }}
    >
      {children}

      <ReceiptRefsCreateModalize ref={receiptRefCreateRef} />
    </ReceiptRefsContext.Provider>
  );
};
