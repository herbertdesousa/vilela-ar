export type ReceiptRefsTypes =
  | 'AirConditioningBrand'
  | 'AirConditioningCapacity'
  | 'AirConditioningService'
  | 'AirConditioningType'
  | 'MaterialAndTool'
  | 'RoomName'
  | 'Architect';

export interface IRefsData {
  label: string;
  type: ReceiptRefsTypes;
  data: string[];
}

export interface IReceiptRefsCreateModalizeRef {
  close(): void;
  open(type: ReceiptRefsTypes): void;
}

export interface IReceiptRefsContextData {
  receiptRefs: IRefsData[];

  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh(): Promise<void>;

  deleteReceiptRef(id: string, type: ReceiptRefsTypes): Promise<void>;
  createReceiptRef(name: string, type: ReceiptRefsTypes): Promise<void>;

  receiptRefCreateRef: React.RefObject<IReceiptRefsCreateModalizeRef>;
}
