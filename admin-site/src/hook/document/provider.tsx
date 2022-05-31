/* eslint-disable no-await-in-loop */
/* eslint-disable no-new */
import React, { useCallback, useEffect, useState } from 'react';
import { useField } from 'formik';

import html2canvas from 'html2canvas';
import { jsPDF as JsPDF } from 'jspdf';

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

function delay(delayInms: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

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
                    type: 'Ar Condicionado',
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

  const [previewPages, setPreviewPages] = useState<IPreviewPages[]>([
    {
      label: 'Página 1',
      isActive: true,
      order: 1,
    },
  ]);
  const changePage = useCallback(pageName => {
    setPreviewPages(st =>
      st.map(page => ({
        ...page,
        isActive: page.label === pageName,
      })),
    );
  }, []);

  useEffect(() => {
    if (add_bank_details_page) {
      setPreviewPages(st => [
        ...st,
        { label: 'Dados Bancários', isActive: false, order: 100000 },
      ]);
    } else {
      setPreviewPages(st =>
        st
          .filter(i => i.label !== 'Dados Bancários')
          .map((y, idx) => ({
            ...y,
            isActive: idx === 0,
          })),
      );
    }
  }, [add_bank_details_page]);

  const saveBlockInPageMeasures = useCallback((payload: IBlocksInPageItem) => {
    const savePreviewPages = (updatedBlocks: IBlocksInPageItem[][]) => {
      setPreviewPages(pages => {
        // if (pages.find(i => i.isActive).label === 'Dados Bancários')
        //   return pages;
        if (pages.findIndex(i => i.isActive) + 1 > updatedBlocks.length) {
          return pages.map((y, idx) => ({
            ...y,
            isActive: idx === 0,
          }));
        }
        return [
          ...Array(updatedBlocks.length)
            .fill('')
            .map((y, idx) => ({
              label: `Página ${idx + 1}`,
              isActive:
                pages.find(i => i.label === `Página ${idx + 1}`)?.isActive ||
                false,
              order: idx,
            })),
          pages.find(i => i.label === 'Dados Bancários'),
        ].filter(i => typeof i !== 'undefined');
      });
    };

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

        const updatedBlocks = order(
          updated.flat().sort((a: any, b: any) => a.order - b.order),
          pageHeight,
        );

        savePreviewPages(updatedBlocks);

        return updatedBlocks;
      }

      const updatedBlocks = order(
        [
          ...st.flat().map(i => ({ ...i, height: i.height || 48 })),
          { ...payload, height: payload.height || 48 },
        ].sort((a: any, b: any) => a.order - b.order),
        pageHeight,
      );

      savePreviewPages(updatedBlocks);

      return updatedBlocks;
    });
  }, []);

  const removeBlockInPageMeasures = useCallback((id: string) => {
    setBlocksInPage(st => {
      return st.map(page => page.filter(block => block.id !== id));
    });
  }, []);

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const generatePDF = useCallback(async () => {
    setIsGeneratingPDF(true);

    const pdf = new JsPDF('p', 'px', '', true);
    const currentPdfPage = { page: pdf };

    // eslint-disable-next-line no-plusplus
    for (let pageIndex = 0; pageIndex < previewPages.length; pageIndex++) {
      setPreviewPages(pages =>
        pages.map((p, idx) => ({ ...p, isActive: idx === pageIndex })),
      );

      await delay(10);

      const takePicAndSave = async () => {
        await html2canvas(document.getElementById('page')).then(canvas => {
          const imgData = canvas.toDataURL('image/png');

          const imgProps = currentPdfPage.page.getImageProperties(imgData);
          const pdfWidth = currentPdfPage.page.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          currentPdfPage.page.addImage(
            imgData,
            'JPEG',
            0,
            0,
            pdfWidth,
            pdfHeight,
            '',
            'FAST',
          );
        });

        if (pageIndex !== previewPages.length - 1)
          currentPdfPage.page = pdf.addPage('', 'p');
      };
      await takePicAndSave();
    }

    pdf.save();
    await delay(1);
    setIsGeneratingPDF(false);
  }, [previewPages]);

  return (
    <DocumentContext.Provider
      value={{
        pdf: {
          isGeneratingPDF,
          generate: generatePDF,
        },
        previewPages: {
          value: previewPages,
          activeIndex: previewPages.findIndex(i => i.isActive),
          activeName: previewPages.find(i => i.isActive).label,
          changePage,
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
