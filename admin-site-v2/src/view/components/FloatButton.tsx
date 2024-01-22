import { IconType } from 'react-icons';
import { MdAdd } from 'react-icons/md';

type Props = { onClick?(): void; Icon?: IconType };

export function FloatButton({ onClick, Icon = MdAdd }: Props) {
  return (
    <button
      type="button"
      className="fixed bottom-8 right-4 flex text-white text-2xl justify-center items-center bg-blue-600 hover:bg-blue-700 transition aspect-square h-14 rounded-[64px]"
      onClick={onClick}
    >
      <Icon size={24} />
    </button>
  );
}
