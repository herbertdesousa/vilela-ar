import { differenceInDays, subDays } from 'date-fns';
import { MdAttachMoney, MdPerson, MdRoom } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { List } from '../components';
import { FloatButton } from '../components/FloatButton';
import { ROUTES } from '../utils/Routes';

type Document = {
  id: string;
  type: 'RECEIPT' | 'BUDGET';
  executed_at: Date;
  service_cost: number;
  customer: {
    name: string;
  };
  address: {
    street_name: string;
    house_number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
  };
};

const DATA = Array(5)
  .fill('')
  .map(
    (_, idx): Document => ({
      id: `id-${idx}`,
      type: 'BUDGET',
      executed_at: subDays(new Date(Date.now()), idx),
      service_cost: 1200,
      customer: {
        name: 'Ex Pak',
      },
      address: {
        street_name: 'Rua Carlos Alberto Luiz',
        neighborhood: 'Vila Medeiros',
        house_number: '148',
        complement: 'Portão Marrom',
        city: 'São Paulo',
        state: 'SP',
        zip_code: '02207-080',
      },
    }),
  );

const DOCUMENT_TYPE_TRANSLATOR = {
  BUDGET: 'Orçamento',
  RECEIPT: 'Recibo',
} satisfies Record<Document['type'], string>;

function formatDate(date: Date): string {
  const diff = differenceInDays(new Date(Date.now()), date);

  if (diff === 0) return 'Feito Hoje';
  else if (diff === 1) return 'Feito Ontem';
  else return `Há ${diff} dias atrás`;
}

export function Docs() {
  return (
    <div className="flex flex-col px-4 py-8 gap-y-8">
      <div className="flex flex-col gap-y-0.5">
        <h1 className="text-xl font-semibold">Documentos</h1>
        <p className="text-blue-600">{DATA.length} Itens</p>
      </div>

      <List.Root>
        {DATA.map((i) => (
          <Link
            key={i.id}
            to={ROUTES.DOCUMENTS.SAVE_ROOMS.buildPath({ document_id: i.id })}
          >
            <List.Item>
              <List.ItemHeader
                title={`${DOCUMENT_TYPE_TRANSLATOR[i.type]} - ${i.customer.name}`}
                subTitle={formatDate(i.executed_at)}
              />

              <div className="flex flex-col gap-y-1.5 overflow-hidden w-full">
                <div className="justify-start items-stretch self-stretch flex gap-2">
                  <MdPerson size={18} className="text-slate-500 min-w-[18px]" />

                  <div className="text-slate-900 text-sm truncate text-start">
                    {i.customer.name}
                  </div>
                </div>

                <div className="justify-start items-stretch self-stretch flex gap-2">
                  <MdRoom size={18} className="text-slate-500 min-w-[18px]" />

                  <p className="text-slate-900 text-sm truncate text-start">
                    {`${i.address.street_name}, ${i.address.neighborhood}, ${i.address.city} - ${i.address.state} - CEP ${i.address.zip_code}`}
                  </p>
                </div>

                <div className="justify-start items-stretch self-stretch flex gap-2">
                  <MdAttachMoney
                    size={18}
                    className="text-slate-500 min-w-[18px]"
                  />

                  <p className="text-slate-900 text-sm truncate text-start">
                    R$ 1.000
                  </p>
                </div>
              </div>
            </List.Item>
          </Link>
        ))}
      </List.Root>

      <FloatButton />
    </div>
  );
}
