import { MdChevronRight } from 'react-icons/md';

type Props = { title: string; subTitle: string };

export function ListItemHeader({ title, subTitle }: Props) {
  return (
    <div className="justify-between items-center self-stretch flex gap-5 py-0.5 w-full">
      <div className="flex flex-col overflow-hidden">
        <strong className="text-slate-900 text-lg font-medium grow whitespace-nowrap text-ellipsis overflow-hidden">
          {title}
        </strong>
        <div className="text-slate-500 text-sm">{subTitle}</div>
      </div>

      <MdChevronRight size={24} className="text-slate-500 min-w-[24px]" />
    </div>
  );
}
