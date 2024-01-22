import { MdAdd, MdClose } from 'react-icons/md';

import { ListItem, StepIndicator } from '../components';

export function Document() {
  return (
    <div className="flex flex-col px-4 py-8 gap-y-8">
      <button type="button" className="flex items-center gap-x-3 font-medium">
        <MdClose size={16} className="text-slate-500" />
        Sair do Documento
      </button>

      <StepIndicator
        activeStepIndex={0}
        activeStepTitle="Salas"
        stepsAmount={3}
      />

      <div className="flex flex-col gap-y-2">
        <button
          type="button"
          className="flex w-full justify-center items-center py-1 px-4 font-medium gap-x-2 bg-blue-100 rounded text-blue-600 hover:bg-blue-200 transition"
        >
          <MdAdd size={18} className="text-blue-600" />
          Nova Sala
        </button>

        <ul className="flex flex-col gap-y-2">
          {[1, 2, 3].map((i) => (
            <ListItem.Root key={i}>
              <ListItem.Header title="Escritório" subTitle="2 Aparelhos" />
            </ListItem.Root>
          ))}
        </ul>
      </div>
    </div>
  );
}
