import { IFinanceDTO } from '@/dtos/IFinanceDTO';

export type ISaveFinance =
  | {
      type: 'income';
      date: string;
      value: string | number;
      description: string;
      customerId?: string;
    }
  | {
      type: 'outcome';
      date: string;
      value: string | number;
      description: string;
    };

export interface IFinancesContextData {
  finances: IFinanceDTO[];

  isInitialLoading: boolean;
  isLoadingMore: boolean;
  isRefreshing: boolean;

  onRefresh(): Promise<void>;
  nextPage(): void;
  deleteFinance(id: string, type: 'income' | 'outcome'): Promise<void>;
  createFinance(data: ISaveFinance): Promise<void>;
  updateFinance(id: string, data: ISaveFinance): Promise<void>;
}
