import { ICustomerDTO } from './ICustomerDTO';

export type IFinanceDTO =
  | {
      type: 'income';
      id: string;
      date: string;
      value: number;
      description: string;
      createdAt: string;
      updatedAt: string;
      customerId?: string;
      customer?: ICustomerDTO;
    }
  | {
      type: 'outcome';
      id: string;
      date: string;
      value: number;
      description: string;
      createdAt: string;
      updatedAt: string;
    };
