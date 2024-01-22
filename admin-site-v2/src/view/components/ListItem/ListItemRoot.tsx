type Props = {
  children: React.ReactNode;
  variant?: 'regular' | 'unselected' | 'selected';
};

export function ListItemRoot({ children }: Props) {
  return (
    <li>
      <button
        type="button"
        className="items-start text-start rounded border border-slate-200 bg-white flex w-full flex-col px-4 py-3 gap-y-4 shadow-sm"
      >
        {children}
      </button>
    </li>
  );
}
