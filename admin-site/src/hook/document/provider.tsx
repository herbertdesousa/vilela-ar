import React, { useCallback } from 'react';
import { useField } from 'formik';

import { v4 } from 'uuid';

import { DocumentContext } from './context';
import {
  IDocumentFormDataLayers,
  IDocumentFormDataLayersBlock,
  IDocumentFormDataLayersBlockPlace,
  IDocumentFormDataLayersBlockPlaceDevice,
} from './types/DocumentFormData';
import { DOCUMENT_BLOCK_INITIALS } from './wrapper';

export const DocumentProvider: React.FC = ({ children }) => {
  const [{ value: layers }, _, { setValue: setLayers }] =
    useField<IDocumentFormDataLayers[]>('layers');

  const layersMoveUp = useCallback(
    (index: number) => {
      const item = layers[index];
      if (item.type === 'header' || item.type === 'payment') return;

      setLayers(
        layers.map((i, idx: number) => {
          if (i.id === item.id) return { ...i, order: i.order - 1 };
          if (index - 1 === idx) return { ...i, order: i.order + 1 };
          return i;
        }),
      );
    },
    [layers, setLayers],
  );
  const layersMoveDown = useCallback(
    (index: number) => {
      const item = layers[index];
      if (item.type === 'header' || item.type === 'payment') return;

      setLayers(
        layers.map((i, idx: number) => {
          if (i.id === item.id) return { ...i, order: i.order + 1 };
          if (index + 1 === idx) return { ...i, order: i.order - 1 };
          return i;
        }),
      );
    },
    [layers, setLayers],
  );
  const layersDuplicate = useCallback(
    (index: number) => {
      const item = layers[index];
      const higherOrder = Math.max(
        ...layers
          .filter(i => i.type !== 'header' && i.type !== 'payment')
          .map((i: any) => i.order),
      );

      setLayers([
        ...layers,
        {
          ...layers.find(layer => layer.id === item.id),
          id: v4(),
          title: `${item.title} (Cópia)`,
          order: higherOrder + 1,
        },
      ]);
    },
    [layers, setLayers],
  );
  const layersRemove = useCallback(
    (index: number) => {
      const item = layers[index];
      setLayers(
        layers
          .filter(i => i.id !== item.id)
          .map((i, idx) => {
            if (i.type === 'header' || i.type === 'payment') return i;
            return { ...i, order: idx - 1 };
          }),
      );
    },
    [layers, setLayers],
  );
  const layersAdd = useCallback(() => {
    const higherOrder = Math.max(
      ...layers
        .filter(i => i.type !== 'header' && i.type !== 'payment')
        .map(i => i.order),
    );

    setLayers([
      ...layers,
      {
        ...DOCUMENT_BLOCK_INITIALS.layers[1],
        id: v4(),
        order: higherOrder + 1,
        type: 'block',
        title: 'Bloco',
      } as IDocumentFormDataLayers,
    ]);
  }, [layers, setLayers]);

  const materialsRemove = useCallback(
    (blockId: string, materialId: string) => {
      setLayers(
        layers.map((block: IDocumentFormDataLayersBlock) => {
          if (block.id !== blockId) return block;
          return {
            ...block,
            materials: block.materials.filter(i => i !== materialId),
          };
        }),
      );
    },
    [layers, setLayers],
  );

  const placeDuplicate = useCallback(
    (blockId: string, item: IDocumentFormDataLayersBlockPlace) => {
      setLayers(
        layers.map((block: IDocumentFormDataLayersBlock) => {
          if (block.id !== blockId) return block;
          return {
            ...block,
            places: [...block.places, { ...item, id: v4() }],
          };
        }),
      );
    },
    [layers, setLayers],
  );
  const placeRemove = useCallback(
    (blockId: string, placeId: string) => {
      setLayers(
        layers.map((block: IDocumentFormDataLayersBlock) => {
          if (block.id !== blockId) return block;
          return {
            ...block,
            places: [...block.places.filter(i => i.id !== placeId)],
          };
        }),
      );
    },
    [layers, setLayers],
  );
  const placeAdd = useCallback(
    (blockId: string) => {
      setLayers(
        layers.map((block: IDocumentFormDataLayersBlock) => {
          if (block.id !== blockId) return block;
          return {
            ...block,
            places: [
              ...block.places,
              { id: v4(), devices: [], room: 'Sala', floor: '' },
            ],
          };
        }),
      );
    },
    [layers, setLayers],
  );

  const placeDeviceDuplicate = useCallback(
    (
      blockId: string,
      placeId: string,
      item: IDocumentFormDataLayersBlockPlaceDevice,
    ) => {
      setLayers(
        layers.map((block: IDocumentFormDataLayersBlock) => {
          if (block.id !== blockId) return block;
          return {
            ...block,
            places: block.places.map(place => {
              if (place.id !== placeId) return place;
              return {
                ...place,
                devices: [...place.devices, { ...item, id: v4() }],
              };
            }),
          };
        }),
      );
    },
    [layers, setLayers],
  );
  const placeDeviceRemove = useCallback(
    (blockId: string, placeId: string, deviceId: string) => {
      setLayers(
        layers.map((block: IDocumentFormDataLayersBlock) => {
          if (block.id !== blockId) return block;
          return {
            ...block,
            places: block.places.map(place => {
              if (place.id !== placeId) return place;
              return {
                ...place,
                devices: place.devices.filter(i => i.id !== deviceId),
              };
            }),
          };
        }),
      );
    },
    [layers, setLayers],
  );
  const placeDeviceAdd = useCallback(
    (blockId: string, placeId: string) => {
      setLayers(
        layers.map((block: IDocumentFormDataLayersBlock) => {
          if (block.id !== blockId) return block;
          return {
            ...block,
            places: block.places.map(place => {
              if (place.id !== placeId) return place;
              return {
                ...place,
                devices: [
                  ...place.devices,
                  {
                    id: v4(),
                    brand: '',
                    capacity: '',
                    mode: '',
                    quantity: 1,
                    type: 'ar condicionado',
                  },
                ],
              };
            }),
          };
        }),
      );
    },
    [layers, setLayers],
  );

  return (
    <DocumentContext.Provider
      value={{
        layers: {
          value: layers,
          moveUp: layersMoveUp,
          moveDown: layersMoveDown,
          duplicate: layersDuplicate,
          remove: layersRemove,
          add: layersAdd,
          firstIndex: 1,
          lastIndex: layers.length - 2,

          materials: {
            remove: materialsRemove,
          },
          places: {
            duplicate: placeDuplicate,
            remove: placeRemove,
            add: placeAdd,

            devices: {
              duplicate: placeDeviceDuplicate,
              remove: placeDeviceRemove,
              add: placeDeviceAdd,
            },
          },
        },
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
