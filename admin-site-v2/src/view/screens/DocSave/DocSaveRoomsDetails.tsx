import { MdAdd, MdClose, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useTypedParams } from 'react-router-typesafe-routes/dom';

import { Button, List } from '@/view/components';
import { ROUTES } from '@/view/utils/Routes';

export function DocSaveRoomsDetails() {
  const { document_id } = useTypedParams(ROUTES.DOCUMENTS.SAVE_ROOMS.DETAILS);

  return (
    <main className="flex flex-col px-4 py-8 gap-y-8">
      <Link
        to={ROUTES.DOCUMENTS.SAVE_ROOMS.buildPath({ document_id })}
        className="flex items-center gap-x-3 font-medium"
      >
        <MdClose size={16} className="text-slate-500" />
        <span>
          Voltar Para <u>Salas</u>
        </span>
      </Link>

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
              to={ROUTES.DOCUMENTS.SAVE_ROOMS.DETAILS.buildPath({
                document_id,
                room_id: String(i),
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
    </main>
  );
}
