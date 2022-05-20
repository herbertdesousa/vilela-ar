import React from 'react';
import { useRouter } from 'next/router';

import { Button, ListItem } from '@/components';
import { MdAdd, MdMoreVert } from 'react-icons/md';

const data = [1, 2, 3, 4];

const DocumentListSideMenu: React.FC = () => {
  const router = useRouter();

  return (
    <section
      className="border-r border-accent-2 min-h-full"
      style={{ width: 512 }}
    >
      <div className="px-6 flex justify-between items-center my-8">
        <h2 className="font-merriweather font-bold text-xl">
          Documentos&nbsp;
          <span className="text-accent-3">
            {data?.length ? `(${data.length})` : ''}
          </span>
        </h2>

        <Button
          variant="outline"
          size="sm"
          leftIcon={MdAdd}
          onClick={() => router.push('/documents/editor')}
        >
          Adicionar
        </Button>
      </div>
      <ul className="overflow-y-scroll no-scroll pb-6 min-h-full">
        {/* {isLoading && (
          <p className="mt-6 w-full text-center text-accent-3">
            Carregando Financias
          </p>
        )}
        {isEmpty && (
          <p className="w-full text-center text-accent-3 mt-6">
            Nenhum Financia Adicionada
          </p>
        )} */}
        {/* {[(finances || [])].map((item, index) => (
          <ListItem
            title={`${item.type === 'INCOME' ? '' : '-'} ${moneyFormat(
              item.value,
            )}`}
            description={item.description || ''}
            key={item.id}
            rightIcon={{
              icon: MdChevronRight,
            }}
            onClick={() => onClickEditFinance(item)}
            showBottomIndicator={finances.length - 1 !== index}
            className={index !== 0 && 'mt-2'}
          />
        ))} */}
        <div className="px-6">
          {data.map((item, index) => (
            <ListItem
              title={`Documento ${item}`}
              key={item}
              rightComponent={{
                icon: MdMoreVert,
                dropdown: {
                  data: [
                    { item: 'Duplicar', value: 'duplicate' },
                    { item: 'Gerar PDF', value: 'pdf' },
                    {
                      item: <span className="text-red">Deletar</span>,
                      value: 'delete',
                    },
                  ],
                  onSelect: i => console.log(i),
                },
              }}
              showBottomIndicator={data.length - 1 !== index}
              className={index !== 0 && 'mt-2'}
            />
          ))}
        </div>
      </ul>
    </section>
  );
};

export default DocumentListSideMenu;
