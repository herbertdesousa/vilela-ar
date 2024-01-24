import classNames from 'classnames';

import { Props } from '@/view/utils/Props';

type TProps = Props & {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: '4/1' | '4/3';
  display?: 'center' | 'between';
  onClick?(): void;
};

export function ButtonRoot({
  children,
  size = '4/1',
  display = 'center',
  variant = 'primary',
  onClick,
}: TProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        'flex w-full font-medium gap-x-2 rounded transition',
        size === '4/1' && 'px-4 py-1',
        size === '4/3' && 'px-4 py-3',
        display === 'center' && 'justify-center items-center',
        display === 'between' && 'justify-between items-center',
        variant === 'primary' && 'bg-blue-600 hover:border-blue-700',
        variant === 'secondary' &&
          'bg-blue-100 text-blue-600 hover:bg-blue-200',
        variant === 'outline' &&
          'bg-white border border-slate-200 hover:border-slate-300',
      )}
    >
      {children}
    </button>
  );
}
