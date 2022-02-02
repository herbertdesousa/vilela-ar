export interface ICustomerDTO {
  id: string;
  name: string;
  type: 'ENTITY' | 'PERSONAL';
  document?: string;
  representative?: string;
  createdAt: string;
  updatedAt: string;
}
