import React, { useRef } from 'react';

import { Button, ListItem } from '@/components';
import Dropdown, { IDropdownRef } from '@/components/Dropdown';
import {
  MdKeyboardArrowDown,
  MdChevronRight,
  MdChevronLeft,
  MdAdd,
} from 'react-icons/md';

const SideMenu: React.FC = () => {
  const monthDropdownRef = useRef<IDropdownRef>(null);

  const topDivRef = useRef<HTMLDivElement>(null);
  const carrouselDaysRef = useRef<HTMLUListElement>(null);

  const dataDays = [1, 2, 3, 4, 5, 6, 7, 8];
  const dataFinances = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const [listFinanceHeight, setListFinanceHeight] = React.useState(210);
  React.useEffect(() => {
    if (!process.browser) setListFinanceHeight(210);
    else
      setListFinanceHeight(
        window.innerHeight - topDivRef.current?.clientHeight,
      );
  }, []);

  return (
    <section
      className="border-r border-accent-2 max-h-screen"
      style={{ width: 512 }}
    >
      <div ref={topDivRef} className="pb-6 pt-12">
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center">
            <button
              type="button"
              className="p-2 border border-accent-2 hover:bg-accent-1 rounded transition mr-2"
              onClick={() => {
                carrouselDaysRef.current?.scrollTo({
                  left: carrouselDaysRef.current?.scrollLeft - 100,
                  behavior: 'smooth',
                });
              }}
            >
              <MdChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="p-2 border border-accent-2 hover:bg-accent-1 rounded transition"
              onClick={() => {
                carrouselDaysRef.current?.scrollTo({
                  left: carrouselDaysRef.current?.scrollLeft + 100,
                  behavior: 'smooth',
                });
              }}
            >
              <MdChevronRight size={16} />
            </button>
          </div>
          <div className="relative">
            <Button
              onClick={() => monthDropdownRef.current.toggle()}
              variant="outline"
              size="sm"
              rightIcon={MdKeyboardArrowDown}
            >
              Agosto 2022
            </Button>
            <Dropdown
              ref={monthDropdownRef}
              data={[
                {
                  value: 'ago',
                  item: <span className="text-primary">Uepa</span>,
                },
                {
                  value: 'sep',
                  item: 'Setembro',
                },
              ]}
              onSelect={item => console.log(item)}
            />
          </div>
        </div>

        <ul
          ref={carrouselDaysRef}
          className="flex max-w-full overflow-scroll no-scroll mt-3 px-6"
        >
          {dataDays.map((item, index) => (
            <li key={item}>
              <button
                type="button"
                className={`
                flex flex-col items-center justify-center w-16 h-20 border border-accent-2 rounded
                hover:bg-accent-1 transition
                ${dataDays.length - 1 !== index && 'mr-3'}
                ${item === 3 && 'border-0 bg-accent-6  hover:bg-accent-6'}
              `}
              >
                <span
                  className={`
                  text-xs mb-3 ${item === 3 ? 'text-accent-0' : 'text-accent-3'}
                `}
                >
                  day
                </span>
                <strong
                  className={`
                  text-3xl font-medium
                  ${item === 3 ? 'text-accent-0' : 'text-accent-6'}
                `}
                >
                  29
                </strong>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex justify-between px-6 mt-6">
          <Button variant="outline" size="sm" className="bg-accent-1">
            Todos
          </Button>
          <Button variant="outline" size="sm">
            Somente Entradas
          </Button>
          <Button variant="outline" size="sm">
            Somente Saídas
          </Button>
        </div>

        <div className="w-full border-b border-accent-2 my-6" />

        <div className="px-6 flex justify-between items-center">
          <h2 className="font-merriweather font-bold text-xl">
            Resultados&nbsp;
            <span className="text-accent-3">{`(${dataFinances.length})`}</span>
          </h2>

          <Button variant="outline" size="sm" leftIcon={MdAdd}>
            Adicionar
          </Button>
        </div>
      </div>

      <ul
        className="overflow-y-scroll no-scroll pb-6"
        style={{ height: listFinanceHeight }}
      >
        {dataFinances.map((item, index) => (
          <ListItem
            title={`item ${item}`}
            description="asdd"
            key={item}
            rightIcon={{
              icon: MdChevronRight,
            }}
            onClick={() => console.log('asda')}
            showBottomIndicator={dataFinances.length - 1 !== index}
            className={index !== 0 && 'mt-2'}
          />
        ))}
      </ul>
    </section>
  );
};

export default SideMenu;
