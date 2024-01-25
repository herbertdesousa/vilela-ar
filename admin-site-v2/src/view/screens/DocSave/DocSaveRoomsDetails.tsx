import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useTypedParams } from 'react-router-typesafe-routes/dom';

import { BackLink, Button, List } from '@/view/components';
import { ROUTES } from '@/view/utils/Routes';

export function DocSaveRoomsDetails() {
  const { document_id, room_id } = useTypedParams(
    ROUTES.DOCUMENTS.SAVE_ROOMS.DETAILS,
  );

  return (
    <main className="flex flex-col px-4 py-8 gap-y-8">
      <BackLink to={ROUTES.DOCUMENTS.SAVE_ROOMS.buildPath({ document_id })}>
        <span>
          Voltar Para <u>Salas</u>
        </span>
      </BackLink>

      <Button.Root variant="outline" size="4/3" display="between">
        <Button.Text variant="inhert">Escritório</Button.Text>
        <Button.Icon variant="edit" Icon={MdEdit} />
      </Button.Root>

      <div className="flex flex-col gap-y-1">
        <h4 className="font-medium">Aparelhos</h4>

        <Button.Root variant="secondary">
          <Button.Icon Icon={MdAdd} variant="primary" />
          <Button.Text variant="inhert">Nova Aparelho</Button.Text>
        </Button.Root>

        <ul className="flex flex-col gap-y-1">
          {[1, 2, 3].map((i) => (
            <Link
              key={i}
              to={ROUTES.DOCUMENTS.SAVE_ROOMS.DETAILS.DEVICE.buildPath({
                device_id: String(i),
                room_id,
              })}
            >
              <List.Item>
                <List.ItemHeader
                  title="1x Ar Condicionado"
                  subTitle="LG Split 12.000 BTUS"
                />
              </List.Item>
            </Link>
          ))}
        </ul>
      </div>

      <div className="w-full h-px bg-slate-300"></div>

      <Button.Root variant="outline">
        <Button.Icon Icon={MdDelete} variant="error" />
        <Button.Text variant="inhert">
          Excluir <u>Escritório</u>
        </Button.Text>
      </Button.Root>
    </main>
  );
}
