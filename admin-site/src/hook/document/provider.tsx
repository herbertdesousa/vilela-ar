/* eslint-disable no-new */
import React, { useCallback, useEffect, useState } from 'react';
import { useField } from 'formik';

import { v4 } from 'uuid';

import { DocumentContext } from './context';
import {
  IDocumentFormDataLayers,
  IDocumentFormDataLayersBlock,
  IDocumentFormDataLayersBlockPlace,
  IDocumentFormDataLayersBlockPlaceDevice,
  IDocumentFormDataType,
} from './types/DocumentFormData';
import { DOCUMENT_BLOCK_INITIALS } from './wrapper';
import { IBlocksInPageItem, IPreviewPages } from './types';

const order = (
  arr: IBlocksInPageItem[],
  limit: number,
): IBlocksInPageItem[][] => {
  const result: IBlocksInPageItem[][] = [];
  const currentIndex = { current: 0 };

  arr.map((item, index): any => {
    if (index === 0) {
      result.push([item]);
      return undefined;
    }

    const sum = result[currentIndex.current]
      .map(i => i.height)
      .reduce((a, b) => a + b);

    if (item.height + sum < limit + 1) {
      result[currentIndex.current].push(item);
    } else {
      currentIndex.current += 1;
      result.push([item]);
    }
    return undefined;
  });

  return result;
};

export const DocumentProvider: React.FC = ({ children }) => {
  const [{ value: document_type }] = useField<IDocumentFormDataType>('type');
  const [{ value: add_bank_details_page }] = useField<IDocumentFormDataType>(
    'add_bank_details_page',
  );
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

      const updatedItem = {
        ...layers.find(layer => layer.id === item.id),
        id: v4(),
        title: `${item.title} (Cópia)`,
        order: higherOrder + 1,
      } as IDocumentFormDataLayersBlock;
      setLayers([...layers, updatedItem]);
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

      removeBlockInPageMeasures(item.id);
    },
    [layers, setLayers],
  );
  const layersAdd = useCallback(() => {
    const higherOrder = Math.max(
      ...layers
        .filter(i => i.type !== 'header' && i.type !== 'payment')
        .map(i => i.order),
      0,
    );

    const item = {
      ...DOCUMENT_BLOCK_INITIALS.layers[1],
      id: v4(),
      order: higherOrder + 1,
      type: 'block',
      title: 'Bloco',
    } as IDocumentFormDataLayersBlock;
    setLayers([...layers, item]);
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
      const duplicateItem = { ...item, id: v4() };
      setLayers(
        layers.map((block: IDocumentFormDataLayersBlock) => {
          if (block.id !== blockId) return block;
          return {
            ...block,
            places: [...block.places, duplicateItem],
          };
        }),
      );
      document.dispatchEvent(
        new CustomEvent('@block-place:duplicate', {
          detail: { item: duplicateItem },
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
      document.dispatchEvent(
        new CustomEvent('@block-place:remove', {
          detail: { blockId, id: placeId },
        }),
      );
    },
    [layers, setLayers],
  );
  const placeAdd = useCallback(
    (blockId: string) => {
      const item = { id: v4(), devices: [], room: 'Sala', floor: '' };

      setLayers(
        layers.map((block: IDocumentFormDataLayersBlock) => {
          if (block.id !== blockId) return block;
          return {
            ...block,
            places: [...block.places, item],
          };
        }),
      );
      document.dispatchEvent(
        new CustomEvent('@block-place:add', {
          detail: { item },
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

  const [blocksInPage, setBlocksInPage] = useState<IBlocksInPageItem[][]>([
    [
      {
        height: 0,
        width: 0,
        ...(layers.filter(
          item => item.type === 'block',
        )[0] as IDocumentFormDataLayersBlock),
      },
      {
        height: 0,
        width: 0,
        ...(layers.filter(
          item => item.type === 'payment',
        )[0] as IDocumentFormDataLayersBlock),
      },
    ],
  ]);

  useEffect(() => {
    layers.map(i => {
      if (i.type === 'block')
        saveBlockInPageMeasures({ ...i, width: 0, height: 0 });

      return i;
    }, []);
  }, [layers]);

  const [previewActivePageIndex, setPreviewActivePageIndex] = useState(0);

  const saveBlockInPageMeasures = useCallback(
    (payload: IBlocksInPageItem) => {
      setBlocksInPage(st => {
        const pageHeight = 400;
        if (st.find(page => page.find(block => block.id === payload.id))) {
          const updated = st.map(page =>
            page.map(block =>
              block.id === payload.id
                ? {
                    ...payload,
                    height: payload.height || block.height,
                    width: payload.width || block.width,
                  }
                : block,
            ),
          );

          const updatedBlocks = order(updated.flat(), pageHeight);

          if (previewActivePageIndex + 1 > updatedBlocks.length)
            setPreviewActivePageIndex(0);

          return updatedBlocks;
        }

        const updatedBlocks = order(
          [...st.flat().map(i => ({ ...i, height: i.height || 95 })), payload],
          pageHeight,
        );
        if (previewActivePageIndex + 1 > updatedBlocks.length)
          setPreviewActivePageIndex(0);
        return updatedBlocks;
      });
    },
    [previewActivePageIndex],
  );

  const removeBlockInPageMeasures = useCallback((id: string) => {
    setBlocksInPage(st => {
      return st.map(page => page.filter(block => block.id !== id));
    });
  }, []);

  // useEffect(() => {
  //   setPreviewActivePageIndex(
  //     blocksInPage.length - 1 > previewActivePageIndex
  //       ? previewActivePageIndex
  //       : 0,
  //   );
  // }, [blocksInPage.length, previewActivePageIndex]);

  // const changePreviewPage = (page: IPreviewPages) => {
  //   setPreviewPages(st =>
  //     st.map(i => (i.label === page.label ? { ...page, isActive: true } : i)),
  //   );
  // };

  // console.log(order(blocksInPage.flat(), 350));
  // console.log(
  //   blocksInPage.map(i => i.map(x => ({ height: x.height, width: x.width }))),
  // );

  return (
    <DocumentContext.Provider
      value={{
        previewPages: {
          value: Array(blocksInPage.length)
            .fill('')
            .map((x, idx) => ({
              label: `Página ${idx + 1}`,
              isActive: idx === previewActivePageIndex,
            })),
          activeIndex: previewActivePageIndex,
          changePage: setPreviewActivePageIndex,
        },
        blocksInPage,
        saveBlockInPageMeasures,
        type: document_type,
        add_bank_details_page: Boolean(add_bank_details_page),
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
