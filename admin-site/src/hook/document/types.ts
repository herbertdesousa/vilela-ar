import {
  IDocumentFormDataLayers,
  IDocumentFormDataLayersBlock,
  IDocumentFormDataLayersPayment,
  IDocumentFormDataLayersBlockPlace,
  IDocumentFormDataLayersBlockPlaceDevice,
  IDocumentFormDataType,
} from './types/DocumentFormData';

type IBlocksInPageItemVariants =
  | IDocumentFormDataLayersBlock
  | IDocumentFormDataLayersPayment;
export type IBlocksInPageItem = IBlocksInPageItemVariants & {
  height: number;
  width: number;
};

export interface IDocumentPayload {
  layers?: {
    onDeleteLayer(id: string): void;
  };
}

export interface IPreviewPages {
  label: string;
  isActive: boolean;
}

export interface IDocumentContextData {
  previewPages: {
    value: IPreviewPages[];
    activeIndex: number;
    changePage(page: number): void;
  };
  blocksInPage: IBlocksInPageItem[][];
  saveBlockInPageMeasures: (payload: IBlocksInPageItem) => void;

  type: IDocumentFormDataType;
  add_bank_details_page: boolean;
  layers: {
    value: IDocumentFormDataLayers[];
    moveUp: (index: number) => void;
    moveDown: (index: number) => void;
    duplicate: (index: number) => void;
    remove: (index: number) => void;
    add: () => void;
    firstIndex: number;
    lastIndex: number;

    materials: {
      remove: (blockId: string, materialId: string) => void;
    };
    places: {
      duplicate: (
        blockId: string,
        item: IDocumentFormDataLayersBlockPlace,
      ) => void;
      remove: (blockId: string, placeId: string) => void;
      add: (blockId: string) => void;

      devices: {
        duplicate: (
          blockId: string,
          placeId: string,
          item: IDocumentFormDataLayersBlockPlaceDevice,
        ) => void;
        remove: (blockId: string, placeId: string, deviceId: string) => void;
        add: (blockId: string, placeId: string) => void;
      };
    };
  };
}
