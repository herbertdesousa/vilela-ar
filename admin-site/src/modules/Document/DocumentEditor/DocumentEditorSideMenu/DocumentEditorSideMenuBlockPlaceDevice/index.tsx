import React from 'react';
import { useRouter } from 'next/router';

import { useField } from 'formik';
import {
  IDocumentFormDataLayersBlockPlace,
  IDocumentFormDataLayersBlockPlaceDevice,
} from '@/hook/document/types/DocumentFormData';

import { MdChevronLeft, MdDelete } from 'react-icons/md';
import romanFormat from '@/utils/romanFormat';
import { BreadCrumb, Select, TextField } from '@/components';
import onlyNumbersFormat from '@/utils/onlyNumbersFormat';

import { useDocument } from '@/hook/document';

const DocumentEditorSideMenuBlockPlaceDevice: React.FC = () => {
  const router = useRouter();

  const { layers } = useDocument();
  const blockId = String(router.query.block_id);
  const blockIndex = layers.value.findIndex(i => i.id === blockId);

  const blockPlaceId = String(router.query.block_place_id);
  const blockPlaceIndex = (layers.value[blockIndex] as any).places.findIndex(
    i => i.id === blockPlaceId,
  );

  const blockPlaceDeviceId = String(router.query.block_place_device_id);
  const blockPlaceDeviceIndex = (layers.value[blockIndex] as any).places[
    blockPlaceIndex
  ].devices.findIndex(i => i.id === blockPlaceDeviceId);

  const backToBlockPlacePage = () => {
    router.push({
      pathname: '/documents/editor/block/place',
      query: { block_id: blockId, block_place_id: blockPlaceId },
    });
  };
  const backToBlockPage = () => {
    router.push({
      pathname: '/documents/editor/block',
      query: { block_id: blockId },
    });
  };

  return (
    <section
      className="min-h-full overflow-x-scroll no-scroll"
      style={{ width: 512 }}
    >
      <div className="flex items-center justify-between px-10 py-6 border-b border-accent-2">
        <button type="button" onClick={backToBlockPlacePage}>
          <MdChevronLeft size={24} className="text-accent-6" />
        </button>

        <h1 className="font-merriweather text-lg font-bold">
          {`Aparelho ${romanFormat(Number(blockPlaceDeviceIndex) + 1)}`}
        </h1>

        <button
          type="button"
          className="flex items-center text-accent-6 font-medium"
          onClick={() => {
            layers.places.devices.remove(
              blockId,
              blockPlaceId,
              blockPlaceDeviceId,
            );
            backToBlockPlacePage();
          }}
        >
          <MdDelete size={20} className="mr-1 text-red" />
          Deletar
        </button>
      </div>

      <div className="px-10">
        <BreadCrumb
          data={[
            {
              label: `Bloco ${romanFormat(blockIndex)}`,
              onClick: backToBlockPage,
            },
            {
              label: `Local ${romanFormat(Number(blockPlaceId) + 1)}`,
              onClick: backToBlockPlacePage,
            },
            {
              label: `Aparelho ${romanFormat(
                Number(blockPlaceDeviceIndex) + 1,
              )}`,
              active: true,
            },
          ]}
          className="mt-8"
        />

        <Select
          name={`layers[${blockIndex}].places[${blockPlaceIndex}].devices[${blockPlaceDeviceIndex}].type`}
          label="Tipo"
          isRequired
          data={[]}
          placeholder="Tipo de Ar Condicionado"
          className="mt-8"
        />
        <Select
          name={`layers[${blockIndex}].places[${blockPlaceIndex}].devices[${blockPlaceDeviceIndex}].mode`}
          label="Modo"
          isRequired
          data={[]}
          placeholder="Modo de Ar Condicionado"
          className="mt-2"
        />
        <Select
          name={`layers[${blockIndex}].places[${blockPlaceIndex}].devices[${blockPlaceDeviceIndex}].brand`}
          label="Marca"
          isRequired
          data={[]}
          placeholder="Marca do Ar Condicionado"
          className="mt-2"
        />
        <Select
          name={`layers[${blockIndex}].places[${blockPlaceIndex}].devices[${blockPlaceDeviceIndex}].capacity`}
          label="Capacidade"
          isRequired
          data={[]}
          placeholder="Capacidade do Ar Condicionado"
          className="mt-2"
        />
        <TextField
          name={`layers[${blockIndex}].places[${blockPlaceIndex}].devices[${blockPlaceDeviceIndex}].quantity`}
          label="Quantidade"
          containerClassName="mt-2"
          formatOnChangeText={onlyNumbersFormat}
        />
      </div>
    </section>
  );
};

export default DocumentEditorSideMenuBlockPlaceDevice;
