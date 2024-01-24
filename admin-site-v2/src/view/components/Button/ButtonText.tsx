import classNames from 'classnames';

import { Props } from '@/view/utils/Props';

type TProps = Props & {
  variant?: 'inhert' | 'over-primary';
};

export function ButtonText({ children, variant = 'over-primary' }: TProps) {
  return (
    <span className={classNames(variant === 'over-primary' && 'text-white')}>
      {children}
    </span>
  );
}
