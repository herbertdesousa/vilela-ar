import { MdAdd, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

import {
  BackLink,
  Button,
  FloatButton,
  List,
  StepIndicator,
} from '@/view/components';
import { ROUTES } from '@/view/utils/Routes';

export function DocSaveRooms() {
  return (
    <main className="flex flex-col px-4 py-8 gap-y-8">
      <BackLink to="/documents" variant="exit">
        Sair do Documento
      </BackLink>

      <StepIndicator
        activeStepIndex={0}
        activeStepTitle="Salas"
        stepsAmount={3}
      />

      <div className="flex flex-col gap-y-2">
        <Button.Root variant="secondary">
          <Button.Icon Icon={MdAdd} variant="primary" />
          <Button.Text variant="inhert">Nova Sala</Button.Text>
        </Button.Root>
        {/* <button
          type="button"
          className="flex w-full justify-center items-center py-1 px-4 font-medium gap-x-2 bg-blue-100 rounded text-blue-600 hover:bg-blue-200 transition"
        >
          <MdAdd size={18} className="text-blue-600" />
          Nova Sala
        </button> */}

        <List.Root>
          {[1, 2, 3].map((i) => (
            <Link
              key={i}
              to={ROUTES.DOCUMENTS.SAVE_ROOMS.DETAILS.buildPath({
                room_id: String(i),
              })}
            >
              <List.Item>
                <List.ItemHeader title="Escritório" subTitle="2 Aparelhos" />
              </List.Item>
            </Link>
          ))}
        </List.Root>
      </div>

      <FloatButton Icon={MdChevronRight} />
    </main>
  );
}
