import { MdAdd } from 'react-icons/md';

type Props = { onClick?(): void };

export function FloatButton({ onClick }: Props) {
  return (
    <button
      type="button"
      className="fixed bottom-8 right-4 flex text-white text-2xl justify-center items-center bg-blue-600 aspect-square h-14 rounded-[64px]"
      onClick={onClick}
    >
      <MdAdd size={24} />
    </button>
  );
}
