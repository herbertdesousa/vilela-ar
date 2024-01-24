type Props = {
  children: React.ReactNode;
  variant?: 'regular' | 'unselected' | 'selected';
  onClick?(): void;
};

export function ListItem({ children, onClick }: Props) {
  return (
    <li>
      <button
        type="button"
        className="items-start text-start rounded border border-slate-200 bg-white flex w-full flex-col px-4 py-2 gap-y-4 shadow-sm"
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
}
