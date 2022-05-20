import {
  IDocumentFormDataLayers,
  IDocumentFormDataLayersBlockPlace,
  IDocumentFormDataLayersBlockPlaceDevice,
} from './types/DocumentFormData';

export interface IDocumentContextData {
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
