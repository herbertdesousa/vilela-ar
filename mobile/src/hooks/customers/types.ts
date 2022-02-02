import { ICustomerDTO } from '@/dtos/ICustomerDTO';

export interface ISaveCustomer {
  name: string;
  type: 'ENTITY' | 'PERSONAL';
  document?: string;
  representative?: string;
}

export interface ICustomersContextData {
  customers: ICustomerDTO[];

  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh(): Promise<void>;

  deleteCustomer(id: string): Promise<void>;
  createCustomer(data: ISaveCustomer): Promise<void>;
  updateCustomer(id: string, data: ISaveCustomer): Promise<void>;
}
