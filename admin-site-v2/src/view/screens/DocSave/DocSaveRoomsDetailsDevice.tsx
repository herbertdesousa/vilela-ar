import { MdChevronRight, MdDelete } from 'react-icons/md';
import { useTypedParams } from 'react-router-typesafe-routes/dom';

import { BackLink, Button } from '@/view/components';
import { ROUTES } from '@/view/utils/Routes';

export function DocSaveRoomsDetailsDevice() {
  const { room_id } = useTypedParams(ROUTES.DOCUMENTS.SAVE_ROOMS.DETAILS);

  return (
    <main className="flex flex-col px-4 py-8 gap-y-8">
      <BackLink to={ROUTES.DOCUMENTS.SAVE_ROOMS.DETAILS.buildPath({ room_id })}>
        <span>
          Voltar Para <u>Escritório</u>
        </span>
      </BackLink>

      <div className="flex flex-col gap-y-2">
        <Button.Root variant="outline" size="4/3" display="between">
          <div className="flex flex-col text-start">
            <Button.Text variant="inhert">Ar Condicionado</Button.Text>

            <p className="text-slate-500 font-normal text-sm">Tipo</p>
          </div>

          <Button.Icon Icon={MdChevronRight} variant="dark" />
        </Button.Root>

        <Button.Root
          variant="outline"
          size="4/3"
          display="between"
          className="border-dashed"
        >
          <div className="flex flex-col text-start">
            <Button.Text variant="inhert">Definir Modo</Button.Text>

            <p className="text-slate-500 font-normal text-sm">
              Ex: Split, K7 (1via) ....
            </p>
          </div>

          <Button.Icon Icon={MdChevronRight} variant="dark" />
        </Button.Root>

        <Button.Root
          variant="outline"
          size="4/3"
          display="between"
          className="border-dashed"
        >
          <div className="flex flex-col text-start">
            <Button.Text variant="inhert">Definir Marca</Button.Text>

            <p className="text-slate-500 font-normal text-sm">
              Ex: Samsung, LG...
            </p>
          </div>

          <Button.Icon Icon={MdChevronRight} variant="dark" />
        </Button.Root>

        <Button.Root
          variant="outline"
          size="4/3"
          display="between"
          className="border-dashed"
        >
          <div className="flex flex-col text-start">
            <Button.Text variant="inhert">Definir Capacidade</Button.Text>

            <p className="text-slate-500 font-normal text-sm">
              Ex: 12.000 BTUS
            </p>
          </div>

          <Button.Icon Icon={MdChevronRight} variant="dark" />
        </Button.Root>
      </div>

      <div className="w-full h-px bg-slate-300"></div>

      <Button.Root variant="outline">
        <Button.Icon Icon={MdDelete} variant="error" />
        <Button.Text variant="inhert">
          Excluir <u>Aparelho</u>
        </Button.Text>
      </Button.Root>
    </main>
  );
}
