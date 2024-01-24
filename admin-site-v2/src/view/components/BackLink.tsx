import { MdChevronLeft, MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Props } from '../utils/Props';

type TProps = Props & {
  to: string;
  variant?: 'back' | 'exit';
};

export function BackLink({ to, variant = 'back', children }: TProps) {
  const Icon = variant === 'back' ? MdChevronLeft : MdClose;

  return (
    <Link to={to} className="flex items-center gap-x-2 font-medium">
      <Icon size={24} className="text-slate-500" />
      {children}
    </Link>
  );
}
