import classNames from 'classnames';
import { IconType } from 'react-icons';

type Props = {
  Icon: IconType;
  variant?: 'primary' | 'edit' | 'over-primary' | 'error' | 'dark';
};

export function ButtonIcon({ Icon, variant = 'over-primary' }: Props) {
  return (
    <Icon
      size={24}
      className={classNames(
        variant === 'primary' && 'text-blue-600',
        variant === 'edit' && 'text-green-800',
        variant === 'over-primary' && 'text-white',
        variant === 'error' && 'text-red-700',
        variant === 'dark' && 'text-slate-600',
      )}
    />
  );
}
