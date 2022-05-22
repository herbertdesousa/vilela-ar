export type IDocumentFormDataType = 'recibo' | 'orçamento';
export interface IDocumentFormData {
  type: IDocumentFormDataType;
  title: string;
  add_bank_details_page: boolean;
  layers: IDocumentFormDataLayers[];
}
export type IDocumentFormDataLayers =
  | IDocumentFormDataLayersHeader
  | IDocumentFormDataLayersBlock
  | IDocumentFormDataLayersPayment;

export type IDocumentFormDataLayersHeader = {
  id: string;
  type: 'header';
  title: string;
  isLock: boolean;
  order: number;

  date: Date;
  representative_engineer: string;
  customer: {
    id: string;
    name: string;
    document: string;
    representative: string;
    address: {
      id: string;
      street?: string;
      number?: string;
      complement?: string;
      neighborhood?: string;
      city?: string;
      state?: string;
      postalCode?: string;
    };
  };
};

export type IDocumentFormDataLayersBlock = {
  id: string;
  type: 'block';
  order: number;
  title: string;
  description: string;
  price: {
    value: string;
    sum_price_in_payment: boolean;
  };
  materials: string[];
  places: IDocumentFormDataLayersBlockPlace[];
};
export type IDocumentFormDataLayersBlockPlace = {
  id: string;
  floor: string;
  room: string;
  devices: IDocumentFormDataLayersBlockPlaceDevice[];
};
export type IDocumentFormDataLayersBlockPlaceDevice = {
  id: string;
  quantity: number;
  type: 'evaporadora' | 'condensadora' | 'ar condicionado';
  brand: string;
  capacity: string;
  mode: string;
};

export type IDocumentFormDataLayersPayment = {
  id: string;
  type: 'payment';
  title: string;
  isLock: boolean;
  order: number;

  comments: string;
  sum_all_prices: boolean;
};
